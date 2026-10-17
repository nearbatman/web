"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/content";

export function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [linksHidden, setLinksHidden] = useState(false);
  const mobileMenu = useRef<HTMLDivElement>(null);
  const desktopNav = useRef<HTMLElement>(null);

  useEffect(() => {
    const topZone = 96;
    const directionDistance = 14;
    let lastY = window.scrollY;
    let distance = 0;

    function onScroll() {
      const y = Math.max(0, window.scrollY);
      const change = y - lastY;
      lastY = y;

      if (y <= topZone) {
        distance = 0;
        setLinksHidden(false);
        return;
      }

      if (change === 0) return;
      distance = Math.sign(change) === Math.sign(distance) ? distance + change : change;
      if (Math.abs(distance) < directionDistance) return;

      // A focused link stays visible for keyboard users.
      if (distance < 0 || !desktopNav.current?.contains(document.activeElement)) {
        setLinksHidden(distance > 0);
      }
      distance = 0;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !mobileMenu.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    function onMenuScroll() {
      setMenuOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onMenuScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onMenuScroll);
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={desktopNav}
        aria-label="sections"
        aria-hidden={linksHidden}
        inert={linksHidden}
        data-hidden={linksHidden}
        className="header-section-nav max-md:hidden"
      >
        <ul className="flex items-center gap-[clamp(16px,2vw,36px)]">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="header-section-link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div ref={mobileMenu} className="header-mobile-entry md:hidden">
        <button
          type="button"
          aria-label={menuOpen ? "close menu" : "open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-section-nav"
          onClick={() => setMenuOpen((open) => !open)}
          className="header-menu-button"
        >
          <span className="header-menu-icon" data-open={menuOpen} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
        <nav
          id="mobile-section-nav"
          aria-label="sections"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          data-open={menuOpen}
          className="header-mobile-nav"
        >
          <ul className="mx-auto max-w-[1400px] px-[clamp(24px,5vw,112px)] py-3">
            {nav.map((item, index) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMenuOpen(false)} className="header-mobile-link">
                  <span className="text-signal">0{index + 1}</span>
                  <span>{item.label}</span>
                  <span aria-hidden="true" className="ml-auto text-signal">↓</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
