import Image from "next/image";
import type { Ref } from "react";
import { brand } from "@/content";

// coin + wordmark. rendered by the header at its natural size and, identically, by the loader.
// every dimension is multiplied by --logo-k (1 in the header), so the loader draws the same logo
// natively large instead of upscaling a small one, and the two stay exact proportional copies.
// the coin is the untouched 400px png (unoptimized): sharp at the header's 30px and the loader's
// largest 160px, even on 2x screens.
export function Logo({ coinRef, wordRef }: { coinRef?: Ref<HTMLImageElement>; wordRef?: Ref<HTMLSpanElement> }) {
  return (
    <span className="flex items-center gap-[calc(8px*var(--logo-k,1))]">
      <Image
        ref={coinRef}
        src={brand.coin}
        alt=""
        width={400}
        height={400}
        unoptimized
        loading="eager"
        className="size-[calc(30px*var(--logo-k,1))] shrink-0 rounded-full"
      />
      {/* optical size pinned to the header's 26px: big shoulders draws narrower glyphs at large
          sizes, which would make the loader's big copy a different shape than the header's */}
      <span
        ref={wordRef}
        style={{ fontVariationSettings: '"opsz" 26' }}
        className="block font-display text-[calc(26px*var(--logo-k,1))] leading-none font-black tracking-[-0.01em] text-bone [text-shadow:0.05em_0.05em_0_var(--color-ink)]"
      >
        {brand.wordmark}
      </span>
    </span>
  );
}
