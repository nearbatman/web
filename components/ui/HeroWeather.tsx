"use client";

import { useEffect, useRef, useState } from "react";
import { weather } from "@/content";

type Drop = { x: number; y: number };

// rain (one canvas, one stroke per depth layer) + two drifting fog banks.
// everything stops when the hero is off screen, and nothing moves for reduced-motion users.
export function HeroWeather() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx || reduced || !visible) return;

    const { rain } = weather;
    const rad = (rain.angle * Math.PI) / 180;
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);
    const tan = Math.tan(rad);
    let w = 0;
    let h = 0;
    let layers: Drop[][] = [];

    // spawn x reaches past the right edge so drifting-left drops still cover the whole frame
    const spawnX = () => Math.random() * (w + h * tan);

    function resize() {
      if (!el) return;
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = w;
      el.height = h;
      const area = (w * h) / (1920 * 1080);
      layers = rain.layers.map((layer) =>
        Array.from({ length: Math.round(rain.density * layer.share * area) }, () => ({
          x: spawnX(),
          y: Math.random() * h,
        })),
      );
    }

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(el);

    let frame = 0;
    let last = performance.now();

    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx!.clearRect(0, 0, w, h);
      rain.layers.forEach((layer, i) => {
        const v = layer.speed * rain.speed * dt;
        ctx!.lineWidth = layer.width;
        ctx!.strokeStyle = `rgba(237, 234, 228, ${rain.opacity * layer.alpha})`;
        ctx!.beginPath();
        for (const d of layers[i]) {
          d.x -= sin * v;
          d.y += cos * v;
          if (d.y - layer.length * cos > h || d.x + layer.length * sin < 0) {
            d.x = spawnX();
            d.y = -layer.length * cos * Math.random();
          }
          ctx!.moveTo(d.x, d.y);
          ctx!.lineTo(d.x + sin * layer.length, d.y - cos * layer.length);
        }
        ctx!.stroke();
      });
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [reduced, visible]);

  const fogState = visible ? "running" : "paused";

  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="fog fog-a"
        style={{ opacity: weather.fog.opacity, animationPlayState: fogState }}
      />
      <div
        className="fog fog-b"
        style={{ opacity: weather.fog.opacity, animationPlayState: fogState }}
      />
      {!reduced && <canvas ref={canvas} className="absolute inset-0 h-full w-full" />}
    </div>
  );
}
