import Link from "next/link";
import { brand, hero, links } from "@/content";
import { BuyButton } from "@/components/ui/BuyButton";
import { Logo } from "@/components/ui/Logo";
import { HeaderNav } from "./HeaderNav";
import { HeaderMotion } from "./HeaderMotion";

// the bar stays in view while its section links respond to scroll direction.
// the hero runs underneath this bar so its transparent top state reveals the artwork.
// data-header-logo is the landing spot for the page-load loader.
export function Header() {
  return (
    <HeaderMotion>
      <div className="mx-auto grid h-full max-w-[1400px] grid-cols-[1fr_auto_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          data-header-logo
          aria-label={brand.wordmark}
          className="justify-self-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
        >
          <Logo />
        </Link>
        <HeaderNav />
        <BuyButton href={links.buy} size="xs" className="header-buy-entry justify-self-end max-md:h-10 max-md:px-3.5 max-md:text-[17px]">
          <span className="sr-only">{hero.buyLabel}</span>
          <span aria-hidden="true" className="header-buy-full">{hero.buyLabel}</span>
          <span aria-hidden="true" className="header-buy-compact">buy</span>
        </BuyButton>
      </div>
    </HeaderMotion>
  );
}
