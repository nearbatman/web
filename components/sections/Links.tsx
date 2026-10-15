import Image from "next/image";
import { linkList, links } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRightIcon } from "@/components/ui/icons";

// last word is the green punchline, split on display only
const cut = linkList.heading.lastIndexOf(" ");
const headingStart = linkList.heading.slice(0, cut);
const headingEnd = linkList.heading.slice(cut + 1);

export function Links() {
  return (
    <section id="links" className="px-[clamp(24px,5vw,112px)] py-[clamp(56px,9.375vw,180px)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-y-12 lg:grid-cols-[7fr_5fr] lg:gap-x-16 items-center">
        <div className="lg:col-start-2 lg:row-start-1">
          <a
            data-reveal
            href={links.irlPost}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={linkList.irl.linkLabel}
            className="group mb-12 block w-full max-w-[440px] -rotate-2 border-2 border-bone bg-ink shadow-[10px_10px_0_0_var(--color-signal)] transition-[rotate,translate,box-shadow] duration-300 ease-(--ease-out-strong) hover:-translate-y-1 hover:rotate-0 hover:shadow-[14px_14px_0_0_var(--color-signal)] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bone"
          >
            <Image
              src={linkList.irl.src}
              alt={linkList.irl.alt}
              width={linkList.irl.width}
              height={linkList.irl.height}
              sizes="440px"
              quality={90}
              className="h-auto w-full"
            />
          </a>
          <SectionHeading>
            {headingStart} <span className="text-signal">{headingEnd}</span>
          </SectionHeading>
        </div>

        <ul className="border-y-2 border-bone lg:col-start-1 lg:row-start-1">
          {linkList.items.map((item) => (
            <li data-reveal key={item.href} className="border-b-2 border-bone/25 last:border-b-0">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-6 font-display text-[clamp(40px,3.75vw,72px)] leading-none font-extrabold transition-colors duration-150 hover:text-signal focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-bone"
              >
                {item.label}
                <ArrowUpRightIcon className="size-[0.7em] shrink-0 transition-transform duration-200 ease-(--ease-out-strong) group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
