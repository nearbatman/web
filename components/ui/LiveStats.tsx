"use client";

import { useEffect, useState, type ReactNode } from "react";
import { links, liveStats } from "@/content";
import { ArrowUpRightIcon } from "./icons";

type Stats = {
  marketCap: number | null;
  price: number | null;
  change: number | null;
  volume: number | null;
};

type State = { status: "loading" } | { status: "error" } | { status: "ready"; stats: Stats };

function num(value: unknown) {
  const n = typeof value === "string" ? Number(value) : value;
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

// $2.28M / $412.50K
function usdCompact(n: number | null) {
  if (n === null) return liveStats.unavailable;
  const units: [number, string][] = [
    [1e9, "B"],
    [1e6, "M"],
    [1e3, "K"],
  ];
  for (const [size, suffix] of units) {
    if (Math.abs(n) >= size) return `$${(n / size).toFixed(2)}${suffix}`;
  }
  return `$${n.toFixed(2)}`;
}

// $0.002282: four significant digits below a dollar, cents above
function usdPrice(n: number | null) {
  if (n === null) return liveStats.unavailable;
  if (n >= 1) return `$${n.toFixed(2)}`;
  return `$${n.toPrecision(4).replace(/e.*$/, "")}`;
}

async function fetchStats(signal: AbortSignal): Promise<Stats> {
  const res = await fetch(liveStats.endpoint, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`dexscreener ${res.status}`);
  const data = await res.json();
  const pair = data?.pair ?? data?.pairs?.[0];
  if (!pair) throw new Error("dexscreener: no pair");
  return {
    marketCap: num(pair.marketCap ?? pair.fdv),
    price: num(pair.priceUsd),
    change: num(pair.priceChange?.h24),
    volume: num(pair.volume?.h24),
  };
}

// polls every refreshMs while the tab is visible; a hidden tab stops polling and
// refreshes once on return. a failed refresh keeps the last good numbers on screen.
function useLiveStats() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let timer = 0;
    let controller: AbortController | null = null;

    async function load() {
      controller?.abort();
      const current = new AbortController();
      controller = current;
      try {
        const stats = await fetchStats(current.signal);
        setState({ status: "ready", stats });
      } catch {
        if (current.signal.aborted) return;
        setState((prev) => (prev.status === "ready" ? prev : { status: "error" }));
      }
    }

    function start() {
      window.clearInterval(timer);
      load();
      timer = window.setInterval(load, liveStats.refreshMs);
    }

    function stop() {
      window.clearInterval(timer);
      controller?.abort();
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return state;
}

function Tile({ label, value, loading, children }: { label: string; value: string; loading: boolean; children?: ReactNode }) {
  return (
    <div className="flex flex-auto flex-col justify-between gap-4 border-2 border-bone bg-night/80 px-4 py-5 sm:px-5">
      <dt className="text-[15px] text-bone/70">{label}</dt>
      <dd>
        {loading ? (
          <span aria-hidden className="block h-[clamp(36px,3vw,56px)] w-[85%] animate-pulse bg-bone/15" />
        ) : (
          <span className="block font-display text-[clamp(36px,3vw,56px)] leading-none font-extrabold tabular-nums">
            {value}
          </span>
        )}
        {children}
      </dd>
    </div>
  );
}

export function LiveStats() {
  const state = useLiveStats();
  const loading = state.status === "loading";
  const stats = state.status === "ready" ? state.stats : null;
  const change = stats?.change ?? null;

  return (
    <div data-reveal>
      <div className="mb-4 flex items-center justify-between gap-4 text-[14px]">
        <span className="inline-flex items-center gap-2.5 text-bone/70">
          <span aria-hidden className={`live-dot ${state.status === "error" ? "is-off" : ""}`} />
          {liveStats.label}
        </span>
        <a
          href={links.dexscreener}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-bone/70 transition-colors duration-150 hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
        >
          {liveStats.source}
          <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 ease-(--ease-out-strong) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <dl aria-busy={loading} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Tile label={liveStats.marketCap} value={usdCompact(stats?.marketCap ?? null)} loading={loading} />
        <Tile label={liveStats.price} value={usdPrice(stats?.price ?? null)} loading={loading}>
          {change !== null && (
            <span className={`mt-2 block text-[14px] font-medium tabular-nums ${change >= 0 ? "text-signal" : "text-[#e5484d]"}`}>
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}% <span className="text-bone/50">{liveStats.change}</span>
            </span>
          )}
        </Tile>
        <Tile label={liveStats.volume} value={usdCompact(stats?.volume ?? null)} loading={loading} />
      </dl>
    </div>
  );
}
