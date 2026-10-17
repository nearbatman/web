import { token, tokenomics } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CopyCA } from "@/components/ui/CopyCA";
import { LiveStats } from "@/components/ui/LiveStats";

export function Tokenomics() {
  return (
    <section id="tokenomics" className="px-[clamp(24px,5vw,112px)] py-[72px] md:py-[clamp(56px,9.375vw,180px)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-y-12 lg:grid-cols-[7fr_5fr] lg:gap-x-16 items-center">
        <div className="lg:col-start-2 lg:row-start-1">
          <SectionHeading>{tokenomics.heading}</SectionHeading>
        </div>

        <div className="flex flex-col gap-10 lg:col-start-1 lg:row-start-1">
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
                <dd
                  className={`font-display text-[clamp(36px,3vw,56px)] leading-none font-extrabold ${row.value === token.liquidity ? "text-signal" : ""}`}
                >
                  {row.value}
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
    </section>
  );
}
