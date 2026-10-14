import { hero, links } from "@/content";
import { BuyButton } from "@/components/ui/BuyButton";
import { CopyCA } from "@/components/ui/CopyCA";
import { HeroMedia } from "@/components/ui/HeroMedia";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100dvh] items-end overflow-hidden">
      <HeroMedia media={hero.media} />
      <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="halftone absolute inset-x-0 bottom-0 -z-10 h-[40%] mask-[linear-gradient(to_top,black_15%,transparent)]"
      />

      <div className="w-full px-[clamp(24px,5vw,112px)] pb-[clamp(56px,10vh,128px)]">
        <h1 className="font-display text-[clamp(104px,12vw,248px)] leading-[0.78] font-black tracking-[-0.01em] text-bone [text-shadow:0.035em_0.035em_0_var(--color-ink)]">
          {hero.wordmark}
        </h1>
        <p className="mt-9 inline-block max-w-[36ch] -rotate-1 border-2 border-ink bg-bone px-4 py-2.5 text-[clamp(16px,1.1vw,21px)] leading-snug font-medium text-ink shadow-[4px_4px_0_0_var(--color-ink)]">
          {hero.sub}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-5">
          <BuyButton href={links.buy}>{hero.buyLabel}</BuyButton>
          <CopyCA />
        </div>
      </div>
    </section>
  );
}
