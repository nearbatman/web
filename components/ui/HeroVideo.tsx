"use client";

import { useEffect, useRef, useState } from "react";

// sits on top of the optimized still. react doesn't reliably server-render the `muted`
// attribute ios needs for autoplay, so it's forced here and play() is called by hand.
// plays only while the hero is on screen; reduced-motion users keep the still.
export function HeroVideo({ src, playbackRate = 1 }: { src: string; playbackRate?: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // the source is attached only after the page has loaded, so the video never competes
  // with fonts, css and the still for first paint. reduced-motion users never download it.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const go = () => {
      timer = window.setTimeout(() => setReady(true), 0);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.muted = true;

    // safari resets playbackRate on load / play / loop, so it is re-applied on each of those
    const applyRate = () => {
      if (video.playbackRate !== playbackRate) video.playbackRate = playbackRate;
    };
    const rateEvents = ["loadedmetadata", "play", "playing", "seeked", "ratechange"] as const;
    rateEvents.forEach((name) => video.addEventListener(name, applyRate));
    applyRate();

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // rejected in low-power mode etc. the still underneath stays visible
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    observer.observe(video);
    return () => {
      observer.disconnect();
      rateEvents.forEach((name) => video.removeEventListener(name, applyRate));
    };
  }, [playbackRate, ready]);

  return (
    <video
      ref={ref}
      src={ready ? src : undefined}
      muted
      loop
      playsInline
      preload="auto"
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 h-full w-full object-cover object-[66%_50%] md:object-center transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
    />
  );
}
