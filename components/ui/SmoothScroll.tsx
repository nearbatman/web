"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Keep native touch scrolling and keyboard navigation. Lenis only softens wheel
// motion and same-page anchor jumps on devices that allow animation.
export function SmoothScroll() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    const easing = (t: number) => 1 - Math.pow(1 - t, 4);

    function headerOffset() {
      return -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 56);
    }

    function syncPreference() {
      lenis?.destroy();
      lenis = null;
      if (preference.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.12,
        stopInertiaOnNavigate: true,
      });
    }

    function onAnchorClick(event: MouseEvent) {
      if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      const hash = link?.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      window.history.pushState(null, "", hash);
      lenis.scrollTo(target, {
        offset: headerOffset(),
        duration: 1.05,
        easing,
        onComplete: () => {
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
        },
      });
    }

    syncPreference();
    document.addEventListener("click", onAnchorClick);
    preference.addEventListener("change", syncPreference);
    return () => {
      document.removeEventListener("click", onAnchorClick);
      preference.removeEventListener("change", syncPreference);
      lenis?.destroy();
    };
  }, []);

  return null;
}
