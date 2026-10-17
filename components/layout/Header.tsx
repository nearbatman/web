import Link from "next/link";
import { brand, hero, links } from "@/content";
import { BuyButton } from "@/components/ui/BuyButton";
import { Logo } from "@/components/ui/Logo";
import { HeaderNav } from "./HeaderNav";

// sticky and identical everywhere: solid night bar, thin bone rule, logo left, nav centered (md+), buy right.
// it sits in the page flow, so the hero starts below it (height = --header-h in globals.css).
// data-header-logo is the landing spot for the page-load loader.
export function Header() {
  return (
    <header className="sticky top-0 z-40 h-(--header-h) border-b border-bone/20 bg-night px-[clamp(24px,5vw,112px)]">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          data-header-logo
          aria-label={brand.wordmark}
          className="justify-self-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
        >
          <Logo />
        </Link>
        <HeaderNav />
        <BuyButton href={links.buy} size="xs" className="justify-self-end max-md:h-10 max-md:px-3.5 max-md:text-[17px]">
          {hero.buyLabel}
        </BuyButton>
      </div>
    </header>
  );
}
