import { heist } from "@/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilmPlayer } from "@/components/ui/FilmPlayer";

// three narration captions stacked, deliberately uneven: alternating offsets and tilts
const placement = ["mr-10 -rotate-1", "ml-10 rotate-1", "ml-4 mr-6 rotate-[0.5deg]"];

// one sentence per line, split on display only
const noteLines = heist.note.split(/(?<=\.)\s+/);

export function Heist() {
  return (
    <section id="heist" className="px-[clamp(24px,5vw,112px)] py-[clamp(56px,9.375vw,180px)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-y-12 lg:grid-cols-[7fr_5fr] lg:gap-x-16 items-center">
        <div className="lg:col-start-2 lg:row-start-1">
          <SectionHeading>{heist.heading}</SectionHeading>

          <ol className="mt-10 flex flex-col gap-7">
            {heist.beats.map((beat, i) => (
              <li
                data-reveal
                key={beat}
                className={`relative border-2 border-ink bg-bone px-6 pt-9 pb-5 text-ink shadow-[6px_6px_0_0_var(--color-signal)] ${placement[i]}`}
              >
                <span className="absolute -top-px -left-px border-2 border-ink bg-signal px-3 py-0.5 font-display text-[26px] leading-none font-extrabold">
                  {i + 1}
                </span>
                <p className="text-[clamp(16px,1.1vw,28px)] leading-[1.5] font-medium">{beat}</p>
              </li>
            ))}
          </ol>

          <p data-reveal className="mt-9 text-[clamp(14px,0.78vw,20px)] leading-relaxed text-bone/70">
            {noteLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div data-reveal className="lg:col-start-1 lg:row-start-1">
          <FilmPlayer />
        </div>
      </div>
    </section>
  );
}
