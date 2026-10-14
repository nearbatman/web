"use client";

import { useEffect, useRef, useState } from "react";

// sits on top of the optimized still. react doesn't reliably server-render the `muted`
// attribute ios needs for autoplay, so it's forced here and play() is called by hand.
export function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.muted = true;
    // rejected in low-power mode etc. the still underneath stays visible
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
    />
  );
}
