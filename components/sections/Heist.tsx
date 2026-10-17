import { heist } from "@/content";
import { TypewriterHeading } from "@/components/ui/TypewriterHeading";
import { FilmPlayer } from "@/components/ui/FilmPlayer";

// three narration captions stacked, deliberately uneven: alternating offsets and tilts
const placement = ["mr-3 sm:mr-10 -rotate-1", "ml-3 sm:ml-10 rotate-1", "ml-1 mr-2 sm:ml-4 sm:mr-6 rotate-[0.5deg]"];

// one sentence per line, split on display only
const noteLines = heist.note.split(/(?<=\.)\s+/);

export function Heist() {
  return (
    <section id="heist" className="px-[clamp(24px,5vw,112px)] py-[88px] md:py-[clamp(56px,9.375vw,180px)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-y-6 md:gap-y-12 lg:grid-cols-[7fr_5fr] lg:gap-x-16 items-center">
        <div className="lg:col-start-2 lg:row-start-1">
          <TypewriterHeading text={heist.heading} speed={58} />

          <ol className="mt-8 md:mt-10 flex flex-col gap-7">
            {heist.beats.map((beat, i) => (
              <li
                data-reveal="stamp"
                key={beat}
                className={`relative border-2 border-ink bg-bone px-4 pt-9 pb-5 sm:px-6 text-ink shadow-[6px_6px_0_0_var(--color-signal)] ${placement[i]}`}
              >
                <span className="absolute -top-px -left-px border-2 border-ink bg-signal px-3 py-0.5 font-display text-[26px] leading-none font-extrabold">
                  {i + 1}
                </span>
                <p className="text-[clamp(16px,1.1vw,28px)] leading-[1.5] font-medium">{beat}</p>
              </li>
            ))}
          </ol>

          <p data-reveal="copy" className="mt-6 md:mt-9 text-[clamp(14px,0.78vw,20px)] leading-relaxed text-bone/70">
            {noteLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div data-reveal="media" data-depth-card className="lg:col-start-1 lg:row-start-1">
          <FilmPlayer />
        </div>
      </div>
    </section>
  );
}
