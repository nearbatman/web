import type { ReactNode } from "react";

// one size for every section heading
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-[clamp(48px,5vw,96px)] leading-[0.85] font-black tracking-[-0.01em]">
      {children}
    </h2>
  );
}
