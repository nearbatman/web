"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { hero, links } from "@/content";
import { BuyButton } from "@/components/ui/BuyButton";

const SCROLL_THRESHOLD = 80;

// fixed to the top. transparent over the hero, solid + slimmer once scrolled past the threshold.
// an invisible sentinel in the page flow tells us when that happens (no scroll listener).
export function Header() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={sentinel}
        aria-hidden
        className="pointer-events-none absolute left-0 w-px"
        style={{ top: SCROLL_THRESHOLD, height: 1 }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b px-[clamp(24px,5vw,112px)] transition-[background-color,border-color,padding] duration-200 ease-out motion-reduce:transition-none ${
          scrolled ? "border-bone/20 bg-night py-[9.5px]" : "border-transparent bg-transparent py-4 sm:py-8"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <Link
            href="/"
            aria-label={hero.wordmark}
            className={`font-display transition-[font-size] duration-200 ${scrolled ? "text-[24px]" : "text-[32px]"} leading-none font-black tracking-[-0.01em] text-bone [text-shadow:0.05em_0.05em_0_var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone`}
          >
            {hero.wordmark}
          </Link>
          <BuyButton href={links.buy} size={scrolled ? "xs" : "sm"}>
            {hero.buyLabel}
          </BuyButton>
        </div>
      </header>
    </>
  );
}
