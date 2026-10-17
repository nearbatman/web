import Image from "next/image";
import type { HeroMedia as Media } from "@/content";
import { HeroVideo } from "./HeroVideo";

// the still is always rendered (it doubles as the video poster), so swapping
// image -> video in content.ts changes nothing about layout or first paint
export function HeroMedia({ media }: { media: Media }) {
  const still = media.kind === "image" ? media.src : media.poster;

  return (
    <div data-hero-media aria-hidden className="absolute inset-0 -z-10">
      <Image
        src={still}
        alt=""
        fill
        sizes="100vw"
        quality={90}
        loading="eager"
        fetchPriority="high"
        className="object-cover object-[66%_50%] md:object-center"
      />
      {media.kind === "video" && <HeroVideo src={media.src} playbackRate={media.playbackRate} />}
    </div>
  );
}
