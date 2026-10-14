import Image from "next/image";
import { links, lore } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

// one sentence per line: the lore reads as a deadpan list, the last line lands in green
const lines = lore.body.split(/(?<=\.)\s+/);

export function Lore() {
  return (
    <section id="lore" className="px-[clamp(24px,5vw,112px)] py-[clamp(56px,9.375vw,180px)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-y-12 lg:grid-cols-[1fr_480px] lg:gap-x-[120px]">
        <div>
          <SectionHeading>{lore.heading}</SectionHeading>
          <p className="mt-12 border-l-2 border-bone/30 pl-8 text-[clamp(18px,1.4vw,27px)] leading-[1.6]">
            {lines.map((line, i) => (
              <span
                key={line}
                className={`block ${i === lines.length - 1 ? "text-signal" : ""}`}
              >
                {line}
              </span>
            ))}
          </p>
        </div>

        <a
          href={links.skidanovPost}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lore.post.linkLabel}
          className="group block w-full max-w-[480px] lg:w-[480px] rotate-[1.5deg] border-2 border-bone bg-ink shadow-[10px_10px_0_0_var(--color-signal)] transition-[rotate,translate,box-shadow] duration-300 ease-(--ease-out-strong) hover:-translate-y-1 hover:rotate-0 hover:shadow-[14px_14px_0_0_var(--color-signal)] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bone"
        >
          <Image
            src={lore.post.src}
            alt={lore.post.alt}
            width={lore.post.width}
            height={lore.post.height}
            sizes="480px"
            quality={90}
            className="h-auto w-full"
          />
        </a>
      </div>
    </section>
  );
}
