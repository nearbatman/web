import type { Metadata } from "next";
import Link from "next/link";
import { hero, notFound } from "@/content";

export const metadata: Metadata = {
  title: notFound.title,
};

// same print language as the hero: wordmark, tilted bone caption, green slab link
export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-end px-[clamp(24px,5vw,112px)] pb-[clamp(40px,10vh,128px)]">
      <div>
        <p className="font-display text-[clamp(72px,24vw,104px)] leading-[0.78] font-black tracking-[-0.01em] text-bone [text-shadow:0.035em_0.035em_0_var(--color-ink)] md:text-[clamp(104px,12vw,307px)]">
          {hero.wordmark}
        </p>
        <h1 className="mt-6 inline-block -rotate-1 border-2 border-ink bg-bone px-4 py-2.5 text-[clamp(16px,1.1vw,28px)] leading-snug font-medium text-ink shadow-[4px_4px_0_0_var(--color-ink)] sm:mt-9">
          {notFound.line}
        </h1>
        <div className="mt-7 sm:mt-10">
          <Link
            href="/"
            className="inline-flex h-16 items-center border-2 border-ink bg-signal px-8 font-display text-[30px] leading-none font-extrabold text-ink shadow-[5px_5px_0_0_var(--color-bone)] transition-[translate,box-shadow] duration-120 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone fine:hover:translate-x-[5px] fine:hover:translate-y-[5px] fine:hover:shadow-[0_0_0_0_var(--color-bone)] fine:active:translate-x-[5px] fine:active:translate-y-[5px] fine:active:shadow-[0_0_0_0_var(--color-bone)]"
          >
            {notFound.home}
          </Link>
        </div>
      </div>
    </main>
  );
}
