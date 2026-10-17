import Link from "next/link";
import { hero, links } from "@/content";
import { BuyButton } from "@/components/ui/BuyButton";

// static: laid over the top of the hero and scrolls away with it.
// mobile: the big hero button is right below, so the header one is hidden there.
export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 px-[clamp(24px,5vw,112px)] py-4 sm:py-8">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <Link
          href="/"
          aria-label={hero.wordmark}
          className="font-display text-[32px] leading-none font-black tracking-[-0.01em] text-bone [text-shadow:0.05em_0.05em_0_var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
        >
          {hero.wordmark}
        </Link>
        <div className="max-md:hidden">
          <BuyButton href={links.buy} size="sm">
            {hero.buyLabel}
          </BuyButton>
        </div>
      </div>
    </header>
  );
}
