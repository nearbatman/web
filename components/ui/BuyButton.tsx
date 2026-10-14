import type { ReactNode } from "react";

type Props = { href: string; children: ReactNode; className?: string };

// green slab with a hard bone "print" shadow; pressing drops it into the shadow
export function BuyButton({ href, children, className = "" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-16 items-center border-2 border-ink bg-signal px-8 font-display text-[30px] leading-none font-extrabold text-ink shadow-[5px_5px_0_0_var(--color-bone)] transition-[translate,box-shadow] duration-150 ease-(--ease-out-strong) hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_var(--color-bone)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0_0_0_0_var(--color-bone)] ${className}`}
    >
      {children}
    </a>
  );
}
