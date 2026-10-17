"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { pageBg } from "@/content";

// fixed backdrop behind everything below the hero (the opaque hero covers it).
// "descending camera": scroll progress maps linearly to translateY, so the top of the image
// shows when the hero has left and the bottom (street) at the end of the page.
export function PageBackground() {
  const root = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);
  const fade = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl = root.current;
    const imageEl = image.current;
    const fadeEl = fade.current;
    const hero = document.getElementById("hero");
    if (!rootEl || !imageEl || !fadeEl || !hero) return;
    // reduced motion: image stays put at its top, no scroll-linked movement at all
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fadeEl.style.display = "none";
      return;
    }

    let frame = 0;

    // everything is read live from the real rendered sizes, so nothing can go stale
    // (viewport resize, mobile toolbars, late layout shifts, image height changes)
    function render() {
      frame = 0;
      const y = window.scrollY;
      const viewportH = rootEl!.clientHeight; // the fixed layer is exactly the visible viewport
      const imageH = imageEl!.offsetHeight; // actual rendered height
      const maxTranslate = Math.max(imageH - viewportH, 0);
      const heroEnd = hero!.offsetTop + hero!.offsetHeight;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const range = Math.max(maxScroll - heroEnd, 1);
      const progress = Math.min(Math.max((y - heroEnd) / range, 0), 1);
      // never more than maxTranslate: the image bottom can't rise above the viewport bottom
      const translate = Math.min(Math.max(progress * maxTranslate, 0), maxTranslate);
      imageEl!.style.transform = `translate3d(0, ${-translate}px, 0)`;
      // dark fade rides along the hero's bottom edge so the hero blends into the backdrop
      fadeEl!.style.transform = `translate3d(0, ${heroEnd - y}px, 0)`;
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(render);
    }

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);
    resizeObserver.observe(rootEl);
    resizeObserver.observe(imageEl);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        ref={image}
        className="absolute inset-x-0 top-0 will-change-transform"
        style={{ height: `${pageBg.heightVh}dvh` }}
      >
        <Image
          src={pageBg.src}
          alt=""
          fill
          sizes="100vw"
          unoptimized
          className="object-cover"
          style={{ opacity: pageBg.bgOpacity, filter: "contrast(1.08) saturate(1.08)" }}
        />
        {/* safety: soft dark fade on the image's own bottom edge so a hard edge can never show */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: pageBg.fadeHeight,
            background:
              "linear-gradient(to top, rgb(11 11 15) 0%, rgb(11 11 15 / 0.88) 14%, rgb(11 11 15 / 0.68) 32%, rgb(11 11 15 / 0.44) 52%, rgb(11 11 15 / 0.22) 72%, rgb(11 11 15 / 0.07) 89%, rgb(11 11 15 / 0) 100%)",
          }}
        />
      </div>
      <div
        ref={fade}
        className="absolute inset-x-0 top-0 will-change-transform"
        style={{
          height: pageBg.fadeHeight,
          // eased stops so there is no visible edge where the fade ends
          background:
            "linear-gradient(to bottom, rgb(11 11 15) 0%, rgb(11 11 15 / 0.88) 14%, rgb(11 11 15 / 0.68) 32%, rgb(11 11 15 / 0.44) 52%, rgb(11 11 15 / 0.22) 72%, rgb(11 11 15 / 0.07) 89%, rgb(11 11 15 / 0) 100%)",
          transform: "translate3d(0, 100vh, 0)",
        }}
      />
    </div>
  );
}
