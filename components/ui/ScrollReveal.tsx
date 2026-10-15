"use client";

import { useEffect } from "react";

const SELECTOR = "[data-reveal]";
// anything on screen that still hasn't revealed this long after it got there is shown anyway
const FALLBACK_MS = 1500;

// one observer for the whole page: every [data-reveal] element fades up once, the first time
// ~15% of it is visible. elements that cross the threshold together are staggered 70ms apart.
// the hidden state is only switched on here (html.reveal-ready), so without js nothing is hidden,
// and the page-load veil covers that switch-on.
// elements react mounts later (a changed key, hot reload) are picked up by a mutation observer;
// before that, a remounted element stayed at opacity 0 forever because nothing observed it.
function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const pending = new Set<HTMLElement>();
    const timers = new Map<HTMLElement, number>();

    function reveal(el: HTMLElement, index = 0) {
      el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 70}ms`);
      el.classList.add("is-revealed");
      pending.delete(el);
      observer.unobserve(el);
      window.clearTimeout(timers.get(el));
      timers.delete(el);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const hits = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
          );
        hits.forEach((el, i) => reveal(el, i));
      },
      { threshold: 0.15 },
    );

    function track(el: HTMLElement) {
      if (pending.has(el) || el.classList.contains("is-revealed")) return;
      pending.add(el);
      observer.observe(el);
    }

    document.querySelectorAll<HTMLElement>(SELECTOR).forEach(track);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(SELECTOR)) track(node);
          node.querySelectorAll<HTMLElement>(SELECTOR).forEach(track);
        });
      }
      schedule();
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    // safety net in case the intersection observer never fires for an element
    let frame = 0;
    function check() {
      frame = 0;
      const viewportH = window.innerHeight;
      pending.forEach((el) => {
        if (timers.has(el)) return;
        const rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < viewportH) {
          timers.set(el, window.setTimeout(() => reveal(el), FALLBACK_MS));
        }
      });
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(check);
    }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      root.classList.remove("reveal-ready");
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.remove("is-revealed"));
    };
  }, []);
}

export function ScrollReveal() {
  useScrollReveal();
  return null;
}
