"use client";

import { useEffect, useRef, useState } from "react";
import { loader } from "@/content";
import { Logo } from "@/components/ui/Logo";

const ACTIVE = "loader-active";

// runs before first paint (inline in <body>): every page load gets the loader unless the user
// prefers reduced motion. html.loader-active shows the overlay and hides the header logo; the
// safety timer removes it no matter what happens to the js bundle.
export const loaderBootScript = `(function(){var d=document.documentElement;try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return}catch(e){return}d.classList.add("${ACTIVE}");setTimeout(function(){d.classList.remove("${ACTIVE}")},${loader.safetyMs})})();`;

const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_IN_OUT = "cubic-bezier(0.65, 0, 0.35, 1)";
// timeline (ms): coin 0-700, wordmark 650-1250, hold 300, flight 1550-2450
const COIN = { delay: 0, duration: 700 };
const WORD = { delay: 650, duration: 600 };
const FLIGHT = { delay: 1550, duration: 900 };
// centered logo size: the coin at most 160px (its png is 400px, so never upscaled),
// and the whole logo at most 80% of the viewport width
const HEADER_COIN = 30;
const MAX_COIN = 160;

// full-screen night overlay: coin pops in with a small y-spin, the wordmark wipes out to its right,
// then the pair shrinks and flies onto the header logo (flip) while the overlay fades.
export function Loader() {
  const [done, setDone] = useState(false);
  const bg = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const coin = useRef<HTMLImageElement>(null);
  const word = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    // reduced motion: the overlay stays display:none (css) and nothing runs
    if (!root.classList.contains(ACTIVE)) return;
    const bgEl = bg.current;
    const groupEl = group.current;
    const coinEl = coin.current;
    const wordEl = word.current;
    const headerEl = document.querySelector<HTMLElement>(".site-header");
    const animations: Animation[] = [];
    const navAnimations: Animation[] = [];
    let cancelled = false;
    let completed = false;

    function finish() {
      completed = true;
      root.classList.remove(ACTIVE);
      setDone(true);
    }

    async function run() {
      if (!bgEl || !groupEl || !coinEl || !wordEl) return finish();
      // the wordmark width depends on the display font, so wait for it (briefly)
      await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 400))]);
      if (cancelled) return;

      // last: the header logo. first: the same logo drawn k times larger, centered.
      const target = document.querySelector<HTMLElement>("[data-header-logo]")?.firstElementChild;
      const last = target?.getBoundingClientRect();
      if (!last || !last.width) return finish();
      const k = Math.min(MAX_COIN / HEADER_COIN, (window.innerWidth * 0.8) / last.width);
      groupEl.style.setProperty("--logo-k", String(k));
      const first = groupEl.getBoundingClientRect();
      const left = (window.innerWidth - first.width) / 2;
      const top = (window.innerHeight - first.height) / 2;
      groupEl.style.left = `${left}px`;
      groupEl.style.top = `${top}px`;
      groupEl.style.opacity = "1";
      const landing = `translate3d(${last.left - left}px, ${last.top - top}px, 0) scale(${last.width / first.width})`;

      animations.push(
        coinEl.animate(
          [
            { opacity: 0, transform: "perspective(600px) rotateY(-70deg) scale(0.6)" },
            { opacity: 1, transform: "perspective(600px) rotateY(0deg) scale(1)" },
          ],
          { ...COIN, easing: EASE_OUT, fill: "both" },
        ),
        wordEl.animate(
          [
            { clipPath: "inset(0 100% 0 0)", transform: "translateX(-0.15em)" },
            { clipPath: "inset(0 -10% -10% 0)", transform: "translateX(0)" },
          ],
          { ...WORD, easing: EASE_OUT, fill: "both" },
        ),
        bgEl.animate([{ opacity: 1 }, { opacity: 0 }], { ...FLIGHT, easing: EASE_IN_OUT, fill: "both" }),
      );
      const flight = groupEl.animate([{ transform: "none" }, { transform: landing }], {
        ...FLIGHT,
        easing: EASE_IN_OUT,
        fill: "both",
      });
      animations.push(flight);
      const headerFlight = headerEl?.animate(
        [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0 0)" }],
        { ...FLIGHT, easing: EASE_IN_OUT, fill: "both" },
      );
      if (headerFlight) animations.push(headerFlight);
      // The links settle a little after the logo lands. Their animations live
      // past the overlay's unmount, so they cannot snap to their final state.
      headerEl?.querySelectorAll<HTMLElement>(".header-section-link, .header-mobile-entry, .header-buy-entry").forEach((el, index) => {
        const animation = el.animate(
          [{ opacity: 0, transform: "translateY(-16px)" }, { opacity: 1, transform: "translateY(0)" }],
          {
            delay: FLIGHT.delay + 350 + Math.min(index, 5) * 55,
            duration: 900,
            easing: EASE_OUT,
            fill: "both",
          },
        );
        navAnimations.push(animation);
        animation.finished.then(() => animation.cancel(), () => {});
      });
      // Keep the mask until both animations reach their final frame. Finishing on
      // the logo alone used to cancel the header midway and make it jump open.
      await Promise.all([flight.finished, headerFlight?.finished]);
      if (!cancelled) finish();
    }

    run().catch(() => {
      if (!cancelled) finish();
    });

    return () => {
      cancelled = true;
      animations.forEach((animation) => animation.cancel());
      if (!completed) navAnimations.forEach((animation) => animation.cancel());
    };
  }, []);

  if (done) return null;

  return (
    <div aria-hidden className="loader fixed inset-0 z-100">
      <div ref={bg} className="absolute inset-0 bg-night" />
      <div ref={group} className="fixed top-0 left-0 opacity-0 will-change-transform" style={{ transformOrigin: "0 0" }}>
        <Logo coinRef={coin} wordRef={word} />
      </div>
    </div>
  );
}
