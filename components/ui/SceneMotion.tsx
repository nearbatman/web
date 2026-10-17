"use client";

import { useEffect } from "react";

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

// A small scroll camera: the hero moves on two planes and the first scene comes forward.
// It only changes transforms and opacity, so the layout and anchor positions stay stable.
export function SceneMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = document.getElementById("hero");
    const loreSection = document.getElementById("lore");
    const media = hero?.querySelector<HTMLElement>("[data-hero-media]");
    const content = hero?.querySelector<HTMLElement>("[data-hero-content]");
    const lore = document.querySelector<HTMLElement>("[data-scene-lore]");
    if (!hero || !loreSection || !media || !content || !lore) return;

    let frame = 0;

    function render() {
      frame = 0;
      const heroProgress = clamp(window.scrollY / Math.max(hero!.offsetHeight * 0.85, 1));
      media!.style.transform = `translate3d(0, ${(-28 * heroProgress).toFixed(1)}px, 0) scale(${(1 + 0.16 * heroProgress).toFixed(3)})`;
      content!.style.transform = `translate3d(0, ${(-90 * heroProgress).toFixed(1)}px, 0) scale(${(1 - 0.05 * heroProgress).toFixed(3)})`;
      content!.style.opacity = String(1 - 0.85 * clamp((heroProgress - 0.3) / 0.7));

      const viewportHeight = window.innerHeight;
      const loreTop = loreSection!.getBoundingClientRect().top + parseFloat(getComputedStyle(loreSection!).paddingTop);
      const loreProgress = clamp((viewportHeight - loreTop) / (viewportHeight * 0.7));
      const remaining = 1 - loreProgress;
      const mobile = window.innerWidth < 768;
      lore!.style.transform = `perspective(1200px) translate3d(0, ${(remaining * (mobile ? 28 : 72)).toFixed(1)}px, 0) rotateX(${(remaining * (mobile ? 0 : 7)).toFixed(2)}deg) scale(${(1 - remaining * (mobile ? 0.01 : 0.035)).toFixed(3)})`;
      lore!.style.opacity = String(1 - remaining * 0.45);
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(render);
    }

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.style.removeProperty("transform");
      content.style.removeProperty("transform");
      content.style.removeProperty("opacity");
      lore.style.removeProperty("transform");
      lore.style.removeProperty("opacity");
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cards = document.querySelectorAll<HTMLElement>("[data-depth-card]");
    const cleanups = Array.from(cards, (card) => {
      let frame = 0;
      let x = 0;
      let y = 0;

      function paint() {
        frame = 0;
        card.style.setProperty("--tilt-x", `${y.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${x.toFixed(2)}deg`);
      }

      function onMove(event: PointerEvent) {
        const rect = card.getBoundingClientRect();
        x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        y = (0.5 - (event.clientY - rect.top) / rect.height) * 6;
        if (!frame) frame = requestAnimationFrame(paint);
      }

      function onLeave() {
        x = 0;
        y = 0;
        if (!frame) frame = requestAnimationFrame(paint);
      }

      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return () => {
        cancelAnimationFrame(frame);
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
