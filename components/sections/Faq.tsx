"use client";

import { useId, useState, type CSSProperties } from "react";
import { faq, type FaqItem } from "@/content";
import { CopyCA } from "@/components/ui/CopyCA";
import { SectionHeading } from "@/components/ui/SectionHeading";

// item.link.text inside the answer becomes a link, the rest stays as written in content.ts
function AnswerText({ item }: { item: FaqItem }) {
  if (!item.link) return <>{item.a}</>;
  const [before, ...after] = item.a.split(item.link.text);
  if (!after.length) return <>{item.a}</>;
  return (
    <>
      {before}
      <a
        href={item.link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-signal underline decoration-2 underline-offset-4 hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
      >
        {item.link.text}
      </a>
      {after.join(item.link.text)}
    </>
  );
}

// + that turns into − (the vertical bar folds flat)
function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden className="shrink-0 text-bone">
      <path d="M3 10h14" stroke="currentColor" strokeWidth="2" />
      <path
        d="M10 3v14"
        stroke="currentColor"
        strokeWidth="2"
        className={`origin-center transition-transform duration-300 ease-(--ease-out-strong) motion-reduce:transition-none ${open ? "scale-y-0" : ""}`}
      />
    </svg>
  );
}

// zigzag like the other sections: items left, heading right (heading first on mobile).
// one open at a time; panels animate height via grid rows 0fr -> 1fr
export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section id="faq" className="px-[clamp(24px,5vw,112px)] py-[88px] md:py-[clamp(56px,9.375vw,180px)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-y-8 md:gap-y-12 lg:grid-cols-[7fr_5fr] lg:gap-x-16">
        {/* heading + sub are centered together on the items */}
        <div className="optical-center lg:col-start-2 lg:row-start-1" style={{ "--shift": 0.0229 } as CSSProperties}>
          <SectionHeading>{faq.heading}</SectionHeading>
          <p data-reveal className="mt-5 text-[clamp(17px,1.2vw,22px)] text-bone/70 sm:mt-7">
            {faq.sub}
          </p>
        </div>

        <ul className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            const buttonId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            // the reveal class is added outside react, so the li's className must never change
            return (
              <li data-reveal key={item.q}>
                <div
                  className={`border-2 border-bone bg-night/80 transition-[box-shadow,translate] duration-300 ease-(--ease-out-strong) motion-reduce:transition-none ${isOpen ? "-translate-y-0.5 shadow-[8px_8px_0_0_var(--color-signal)]" : "shadow-[0_0_0_0_var(--color-signal)]"}`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-[clamp(17px,1.2vw,22px)] font-medium text-bone sm:px-7 sm:py-6 focus-visible:outline-2 focus-visible:-outline-offset-6 focus-visible:outline-bone"
                    >
                      {item.q}
                      <PlusMinus open={isOpen} />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-(--ease-out-strong) motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="px-5 pb-6 sm:px-7 sm:pb-7">
                        {item.ca ? (
                          <CopyCA variant="row" />
                        ) : (
                          <p className="max-w-[60ch] text-[clamp(15px,1vw,19px)] leading-[1.6] text-bone/70">
                            <AnswerText item={item} />
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
