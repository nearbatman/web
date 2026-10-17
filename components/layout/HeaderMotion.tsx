"use client";

import { useEffect, useState, type ReactNode } from "react";

export function HeaderMotion({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;

    function render() {
      frame = 0;
      setScrolled(window.scrollY > 32);
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(render);
    }

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="site-header sticky top-0 z-40 h-(--header-h) px-[clamp(24px,5vw,112px)]"
    >
      {children}
    </header>
  );
}
