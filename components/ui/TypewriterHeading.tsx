"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  text: string;
  breakAt?: number;
  accentFrom?: number;
  blinkFinalDot?: boolean;
  shift?: number;
  speed?: number;
};

export function TypewriterHeading({ text, breakAt, accentFrom, blinkFinalDot = false, shift, speed = 70 }: Props) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [visibleText, setVisibleText] = useState(text);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = heading.current;
    if (!element || !window.IntersectionObserver) return;

    element.dataset.typewriter = "waiting";
    let characterTimer = 0;
    let caretTimer = 0;
    let revealFrame = 0;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        element.dataset.typewriter = "resetting";
        setVisibleText("");
        setTyping(true);

        let count = 0;
        function typeNext() {
          count += 1;
          setVisibleText(text.slice(0, count));
          if (count < text.length) {
            const interval = Math.min(56, Math.max(38, Math.round(speed * 0.7)));
            characterTimer = window.setTimeout(typeNext, text[count - 1] === " " ? Math.round(interval * 0.5) : interval);
          } else {
            caretTimer = window.setTimeout(() => setTyping(false), 550);
          }
        }
        revealFrame = requestAnimationFrame(() => {
          element.dataset.typewriter = "typing";
          characterTimer = window.setTimeout(typeNext, 50);
        });
      },
      { rootMargin: "0px 0px 8% 0px", threshold: 0.05 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(revealFrame);
      window.clearTimeout(characterTimer);
      window.clearTimeout(caretTimer);
      delete element.dataset.typewriter;
    };
  }, [text, speed]);

  function formatted(value: string, ghost = false): ReactNode {
    if (breakAt !== undefined) {
      return <>{value.slice(0, breakAt)}{value.length > breakAt && <><br />{value.slice(breakAt + 1)}</>}</>;
    }
    if (accentFrom !== undefined) {
      const accent = value.slice(accentFrom);
      const completedDot = blinkFinalDot && !ghost && value === text && accent.endsWith(".");
      return <>
        {value.slice(0, accentFrom)}
        <span className="text-signal">
          {completedDot ? accent.slice(0, -1) : accent}
          {completedDot && <span className="cursor-blink">.</span>}
        </span>
      </>;
    }
    return value;
  }

  return (
    <h2
      ref={heading}
      aria-label={text}
      className={`typewriter-heading relative font-display text-(length:--heading-size) leading-[0.85] font-black tracking-[-0.01em] ${shift ? "optical-center" : ""}`}
      style={shift ? ({ "--shift": shift } as CSSProperties) : undefined}
    >
      <span aria-hidden="true" className="invisible block">{formatted(text, true)}</span>
      <span aria-hidden="true" className="typewriter-ink absolute inset-0 block">
        {formatted(visibleText)}
        {typing && <span className="typewriter-caret" />}
      </span>
    </h2>
  );
}
