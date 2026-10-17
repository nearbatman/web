import type { CSSProperties, ReactNode } from "react";

// one size for every section heading.
// shift: optical centering for a heading that is vertically centered against a block (see .optical-center)
export function SectionHeading({ children, className = "", shift }: { children: ReactNode; className?: string; shift?: number }) {
  return (
    <h2
      data-reveal
      className={`font-display text-(length:--heading-size) leading-[0.85] font-black tracking-[-0.01em] ${shift ? "optical-center" : ""} ${className}`}
      style={shift ? ({ "--shift": shift } as CSSProperties) : undefined}
    >
      {children}
    </h2>
  );
}
