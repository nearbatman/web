import Link from "next/link";
import { hero, links } from "@/content";
import { BuyButton } from "@/components/ui/BuyButton";

// sticky and identical everywhere: solid night bar, thin bone rule, wordmark left, buy right.
// it sits in the page flow, so the hero starts below it (height = --header-h in globals.css).
export function Header() {
  return (
    <header className="sticky top-0 z-40 h-(--header-h) border-b border-bone/20 bg-night px-[clamp(24px,5vw,112px)]">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between">
        <Link
          href="/"
          aria-label={hero.wordmark}
          className="font-display text-[26px] leading-none font-black tracking-[-0.01em] text-bone [text-shadow:0.05em_0.05em_0_var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
        >
          {hero.wordmark}
        </Link>
        <BuyButton href={links.buy} size="xs" className="max-md:h-10 max-md:px-3.5 max-md:text-[17px]">
          {hero.buyLabel}
        </BuyButton>
      </div>
    </header>
  );
}
