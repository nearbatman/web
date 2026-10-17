"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { links, liveStats, token } from "@/content";
import { ArrowUpRightIcon } from "./icons";

type Stats = {
  marketCap: number | null;
  price: number | null;
  change: number | null;
  volume: number | null;
  liquidity: number | null;
  buys: number | null;
  sells: number | null;
};

type State = { status: "loading" } | { status: "error" } | { status: "ready"; stats: Stats };

function num(value: unknown) {
  const n = typeof value === "string" ? Number(value) : value;
  return typeof n === "number" && Number.isFinite(n) ? n : null;
}

// $2.28M / $412.50K (digits = decimals)
function usdCompact(n: number | null, digits = 2) {
  if (n === null) return liveStats.unavailable;
  const units: [number, string][] = [
    [1e9, "B"],
    [1e6, "M"],
    [1e3, "K"],
  ];
  for (const [size, suffix] of units) {
    if (Math.abs(n) >= size) return `$${(n / size).toFixed(digits)}${suffix}`;
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
    liquidity: num(pair.liquidity?.usd),
    buys: num(pair.txns?.h24?.buys),
    sells: num(pair.txns?.h24?.sells),
  };
}

// one shared poller for every live component (tiles + liquidity row): polls every refreshMs
// while the tab is visible and anyone is subscribed; a hidden tab stops polling and refreshes
// once on return. a failed refresh keeps the last good numbers on screen.
const LOADING: State = { status: "loading" };
let snapshot: State = LOADING;
const listeners = new Set<() => void>();
let timer = 0;
let controller: AbortController | null = null;

function emit(next: State) {
  snapshot = next;
  listeners.forEach((listener) => listener());
}

async function load() {
  controller?.abort();
  const current = new AbortController();
  controller = current;
  try {
    emit({ status: "ready", stats: await fetchStats(current.signal) });
  } catch {
    if (current.signal.aborted) return;
    if (snapshot.status !== "ready") emit({ status: "error" });
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

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    document.addEventListener("visibilitychange", onVisibility);
    if (!document.hidden) start();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    }
  };
}

function useLiveStats() {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => LOADING,
  );
}

// small line under a tile value: 24h % change (green/red) or the 24h buys / sells count
function Change({ value }: { value: number }) {
  return (
    <span
      className={`mt-1 block text-[10px] font-medium whitespace-nowrap tabular-nums md:mt-2 md:text-[14px] ${value >= 0 ? "text-signal" : "text-[#e5484d]"}`}
    >
      {value >= 0 ? "+" : ""}
      {value.toFixed(2)}%<span className="text-bone/50 max-md:hidden"> {liveStats.change}</span>
    </span>
  );
}

// below md the three tiles share one row: compact padding, short labels, and a value font sized
// from the tile's own width (cqi), so "$0.002369" always fits on one line (≈4.24em wide).
// md+ keeps the content-sized tiles (no container there: it would collapse their intrinsic width).
function Tile({
  label,
  short,
  value,
  loading,
  children,
}: {
  label: string;
  short: string;
  value: string;
  loading: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col justify-between gap-2 border-2 border-bone bg-night/80 p-2.5 max-md:@container md:flex-auto md:gap-4 md:px-5 md:py-5">
      <dt className="text-[10px] text-bone/70 md:text-[15px]">
        <span className="md:hidden">{short}</span>
        <span className="max-md:hidden">{label}</span>
      </dt>
      <dd>
        {loading ? (
          <span
            aria-hidden
            className="block h-[clamp(12px,22cqi,20px)] w-[85%] animate-pulse bg-bone/15 md:h-[clamp(36px,3vw,56px)]"
          />
        ) : (
          <span className="block font-display text-[clamp(12px,22cqi,20px)] leading-none font-extrabold whitespace-nowrap tabular-nums md:text-[clamp(36px,3vw,56px)]">
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

      <dl aria-busy={loading} className="grid grid-cols-3 gap-2 md:flex md:flex-row md:flex-wrap md:gap-3">
        <Tile label={liveStats.marketCap} short={liveStats.marketCapShort} value={usdCompact(stats?.marketCap ?? null)} loading={loading}>
          {change !== null && <Change value={change} />}
        </Tile>
        <Tile label={liveStats.price} short={liveStats.priceShort} value={usdPrice(stats?.price ?? null)} loading={loading}>
          {change !== null && <Change value={change} />}
        </Tile>
        <Tile label={liveStats.volume} short={liveStats.volumeShort} value={usdCompact(stats?.volume ?? null)} loading={loading}>
          {stats?.buys != null && stats.sells != null && (
            <span className="mt-1 block text-[10px] whitespace-nowrap text-bone/50 tabular-nums md:mt-2 md:text-[14px]">
              <span className="md:hidden">
                {stats.buys}/{stats.sells}
              </span>
              <span className="max-md:hidden">
                {stats.buys} {liveStats.buys} / {stats.sells} {liveStats.sells}
              </span>
            </span>
          )}
        </Tile>
      </dl>
    </div>
  );
}

// tokenomics liquidity row: "$380K · locked", only "locked" in green. until the value
// arrives (or if dexscreener is down) it is just "locked".
export function LiveLiquidity() {
  const state = useLiveStats();
  const usd = state.status === "ready" ? state.stats.liquidity : null;

  return (
    <>
      {usd !== null && (
        <>
          {usdCompact(usd, usd >= 1e6 ? 2 : 0)} <span className="text-bone/40">{liveStats.liquiditySeparator}</span>{" "}
        </>
      )}
      <span className="text-signal">{token.liquidity}</span>
    </>
  );
}
