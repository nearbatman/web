"use client";

import { useEffect } from "react";

// one observer for the whole page: every [data-reveal] element fades up once, the first time
// ~15% of it is visible. elements that cross the threshold together are staggered 70ms apart.
// the hidden state is only switched on here (html.reveal-ready), so without js nothing is hidden,
// and the page-load veil covers that switch-on.
function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        const hits = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) =>
            a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
          );
        hits.forEach((el, i) => {
          el.style.setProperty("--reveal-delay", `${Math.min(i, 5) * 70}ms`);
          el.classList.add("is-revealed");
          observer.unobserve(el);
        });
      },
      { threshold: 0.15 },
    );
    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
      targets.forEach((el) => el.classList.remove("is-revealed"));
    };
  }, []);
}

export function ScrollReveal() {
  useScrollReveal();
  return null;
}
