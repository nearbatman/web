"use client";

import { useRef, useState } from "react";
import { heist } from "@/content";

// poster first, nothing downloads (preload none) until the click; the click is the
// user gesture that lets the video start with sound
export function FilmPlayer() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function start() {
    const video = ref.current;
    if (!video) return;
    setStarted(true);
    video.muted = false;
    video.play().catch(() => {});
  }

  return (
    <div className="relative aspect-video w-full border-2 border-bone bg-ink shadow-[12px_12px_0_0_var(--color-signal)]">
      <video
        ref={ref}
        src={heist.film.src}
        poster={heist.film.poster}
        preload="none"
        playsInline
        controls={started}
        className="h-full w-full object-cover"
      />
      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label={heist.film.playLabel}
          className="group absolute inset-0 flex items-center justify-center bg-night/20 transition-colors duration-200 hover:bg-night/0 focus-visible:outline-2 focus-visible:-outline-offset-8 focus-visible:outline-bone"
        >
          <span className="flex size-28 items-center justify-center border-2 border-ink bg-signal shadow-[6px_6px_0_0_var(--color-bone)] transition-[translate,box-shadow] duration-150 ease-(--ease-out-strong) group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[8px_8px_0_0_var(--color-bone)] group-active:translate-x-[6px] group-active:translate-y-[6px] group-active:shadow-none">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-1.5 text-ink">
              <path d="M6 3.5v17l14-8.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
