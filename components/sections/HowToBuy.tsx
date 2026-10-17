import { howToBuy, links } from "@/content";
import { CopyCA } from "@/components/ui/CopyCA";
import { SectionHeading } from "@/components/ui/SectionHeading";

// howToBuy.buyLinkText inside a step becomes a link, the rest of the string stays as written in content.ts
function StepText({ text }: { text: string }) {
  const [before, ...after] = text.split(howToBuy.buyLinkText);
  if (!after.length) return <>{text}</>;
  return (
    <>
      {before}
      <a
        href={links.buy}
        target="_blank"
        rel="noopener noreferrer"
        className="relative text-signal underline after:absolute after:-inset-x-2 after:-inset-y-3 after:content-[''] decoration-2 underline-offset-4 hover:text-bone focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
      >
        {howToBuy.buyLinkText}
      </a>
      {after.join(howToBuy.buyLinkText)}
    </>
  );
}

// break before the last two words (display only)
const words = howToBuy.heading.split(" ");
const headingStart = words.slice(0, -2).join(" ");
const headingEnd = words.slice(-2).join(" ");

export function HowToBuy() {
  const last = howToBuy.steps.length - 1;

  return (
    <section id="how-to-buy" className="px-[clamp(24px,5vw,112px)] py-[88px] md:py-[clamp(56px,9.375vw,180px)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-y-8 md:gap-y-12 lg:grid-cols-[5fr_7fr] lg:gap-x-16">
        <SectionHeading shift={-0.0833}>
          {headingStart}
          <br />
          {headingEnd}
        </SectionHeading>

        <ol className="border-y-2 border-bone">
          {howToBuy.steps.map((step, i) => (
            <li
              data-reveal
              key={step}
              className="grid grid-cols-[64px_1fr] items-start gap-x-4 sm:grid-cols-[120px_1fr] sm:gap-x-6 border-b-2 border-bone/25 py-7 last:border-b-0"
            >
              <span
                aria-hidden
                className="font-display text-[64px] leading-[0.8] sm:text-[96px] font-black text-transparent [-webkit-text-stroke:2px_var(--color-bone)]"
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="text-[clamp(18px,1.4vw,26px)] leading-[1.5]">
                  <StepText text={step} />
                </p>
                {i === last && <CopyCA variant="row" className="mt-5 sm:mt-6" />}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
