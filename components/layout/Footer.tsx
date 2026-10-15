import { footer, links } from "@/content";
import { XIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="relative z-[31] px-[clamp(24px,5vw,112px)]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 border-t border-bone py-[clamp(20px,1.46vw,28px)] lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <p className="max-w-[900px] text-[13px] leading-relaxed text-bone/60">{footer.disclaimer}</p>
        <div className="flex shrink-0 items-center gap-4 text-[14px] text-bone/60">
          <span>{footer.copyright}</span>
          <a
            href={links.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={footer.xLabel}
            className="-m-3 p-3 text-bone transition-colors duration-150 hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
          >
            <XIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
