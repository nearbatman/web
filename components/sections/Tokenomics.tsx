import type { CSSProperties } from "react";
import { chart, token, tokenomics } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CopyCA } from "@/components/ui/CopyCA";
import { LiveLiquidity, LiveStats } from "@/components/ui/LiveStats";

export function Tokenomics() {
  return (
    <section id="numbers" className="px-[clamp(24px,5vw,112px)] py-[88px] md:py-[clamp(56px,9.375vw,180px)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-y-8 md:gap-y-12 lg:grid-cols-[7fr_5fr] lg:gap-x-16 items-center">
        {/* centered on the block from the "live" label down to the bottom rule */}
        <div className="optical-center lg:col-start-2 lg:row-start-1" style={{ "--shift": 0.0417 } as CSSProperties}>
          <SectionHeading>{tokenomics.heading}</SectionHeading>
        </div>

        <div className="flex flex-col gap-6 md:gap-10 lg:col-start-1 lg:row-start-1">
          <LiveStats />

          {/* case-file sheet: rules instead of cards */}
          <dl className="border-y-2 border-bone">
            {tokenomics.rows.map((row) => (
              <div
                data-reveal
                key={row.label}
                className="flex items-baseline justify-between gap-6 border-b-2 border-bone/25 py-5"
              >
                <dt className="text-[17px] text-bone/70">{row.label}</dt>
                <dd className="text-right font-display text-[clamp(36px,3vw,56px)] leading-none font-extrabold">
                  {row.value === token.liquidity ? <LiveLiquidity /> : row.value}
                </dd>
              </div>
            ))}
            <div data-reveal className="flex items-center justify-between gap-3 py-5 sm:gap-6">
              <dt className="shrink-0 text-[17px] text-bone/70">contract</dt>
              <dd className="ml-auto min-w-0">
                <CopyCA variant="inline" />
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* geckoterminal embed: nearly.trade refuses framing, see content.ts */}
      <div
        data-reveal
        className="mx-auto mt-6 h-[480px] max-w-[1400px] border-2 border-bone bg-ink shadow-[8px_8px_0_0_var(--color-signal)] sm:h-[560px] sm:shadow-[10px_10px_0_0_var(--color-signal)] md:mt-[clamp(64px,6vw,120px)]"
      >
        <iframe src={chart.src} title={chart.title} loading="lazy" className="block h-full w-full" />
      </div>
    </section>
  );
}
