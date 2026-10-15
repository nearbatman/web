import { hero, links } from "@/content";
import { BuyButton } from "@/components/ui/BuyButton";
import { CopyCA } from "@/components/ui/CopyCA";
import { HeroMedia } from "@/components/ui/HeroMedia";
import { HeroWeather } from "@/components/ui/HeroWeather";

export function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-[100dvh] items-end overflow-hidden">
      <HeroMedia media={hero.media} />
      <HeroWeather />
      <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="halftone absolute inset-x-0 bottom-0 -z-10 h-[40%] mask-[linear-gradient(to_top,black_15%,transparent)]"
      />

      <div className="w-full px-[clamp(24px,5vw,112px)] min-[1921px]:pl-[calc((100%-1400px)/2)] pb-[clamp(40px,10vh,128px)] short-mobile:pb-8">
        <h1
          className="hero-rise font-display text-[clamp(72px,24vw,104px)] short-mobile:text-[64px] md:text-[clamp(104px,12vw,307px)] leading-[0.78] font-black tracking-[-0.01em] text-bone [text-shadow:0.035em_0.035em_0_var(--color-ink)]"
          style={{ animationDelay: "300ms" }}
        >
          {hero.wordmark}
        </h1>
        <p
          className="hero-rise mt-6 short-mobile:mt-4 inline-block sm:mt-9 max-w-[36ch] -rotate-1 border-2 border-ink bg-bone px-4 py-2.5 short-mobile:max-w-none short-mobile:px-3 short-mobile:py-1.5 short-mobile:text-[13px] text-[clamp(16px,1.1vw,28px)] leading-snug font-medium text-ink shadow-[4px_4px_0_0_var(--color-ink)]"
          style={{ animationDelay: "450ms" }}
        >
          {hero.sub}
        </p>
        <div
          className="hero-rise mt-7 short-mobile:mt-5 flex flex-col gap-4 short-mobile:gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5"
          style={{ animationDelay: "600ms" }}
        >
          <BuyButton href={links.buy} className="w-full justify-center short-mobile:h-12 short-mobile:text-[24px] sm:w-auto">{hero.buyLabel}</BuyButton>
          <CopyCA />
        </div>
      </div>
    </section>
  );
}
