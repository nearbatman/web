import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  size?: "md" | "sm" | "xs";
  className?: string;
};

const sizes = {
  md: "h-16 px-8 text-[30px] shadow-[5px_5px_0_0_var(--color-bone)] fine:hover:translate-x-[5px] fine:hover:translate-y-[5px] fine:hover:shadow-[0_0_0_0_var(--color-bone)] fine:active:translate-x-[5px] fine:active:translate-y-[5px] fine:active:shadow-[0_0_0_0_var(--color-bone)]",
  sm: "h-11 px-4 sm:px-5 text-[22px] shadow-[3px_3px_0_0_var(--color-bone)] fine:hover:translate-x-[3px] fine:hover:translate-y-[3px] fine:hover:shadow-[0_0_0_0_var(--color-bone)] fine:active:translate-x-[3px] fine:active:translate-y-[3px] fine:active:shadow-[0_0_0_0_var(--color-bone)]",
  xs: "h-11 px-4 md:h-9 text-[18px] shadow-[2px_2px_0_0_var(--color-bone)] fine:hover:translate-x-[2px] fine:hover:translate-y-[2px] fine:hover:shadow-[0_0_0_0_var(--color-bone)] fine:active:translate-x-[2px] fine:active:translate-y-[2px] fine:active:shadow-[0_0_0_0_var(--color-bone)]",
};

// green slab with a hard bone "print" shadow; pressing drops it into the shadow
export function BuyButton({ href, children, size = "md", className = "" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center border-2 border-ink bg-signal font-display leading-none font-extrabold text-ink transition-[translate,box-shadow,height,padding,font-size] duration-120 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  );
}
