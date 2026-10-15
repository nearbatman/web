"use client";

import { useEffect, useRef, useState } from "react";
import { copyCa, token } from "@/content";
import { CheckIcon, CopyIcon } from "./icons";

type Status = "idle" | "copied" | "failed";

// clipboard api first; execCommand fallback for in-app browsers (x, telegram) that block it
async function writeClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {}
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {}
  ta.remove();
  return ok;
}

// variants "row" / "inline" sit in a row/step that already says "contract", so the "ca" prefix is dropped on mobile
export function CopyCA({ className = "", variant = "hero" }: { className?: string; variant?: "hero" | "row" | "inline" }) {
  const [status, setStatus] = useState<Status>("idle");
  const addressRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function handleClick() {
    const ok = await writeClipboard(token.ca);
    if (!ok && addressRef.current) {
      // last resort: select the address so a long-press / cmd+c works
      const range = document.createRange();
      range.selectNodeContents(addressRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    setStatus(ok ? "copied" : "failed");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), ok ? 1600 : 4000);
  }

  const isInline = variant === "inline";
  // "inline": compact pill that shares a line with its label below md; the address is
  // middle-truncated on screen when the row is tight (copy always uses the full token.ca)
  const box = {
    hero: "short-mobile:min-h-12 short-mobile:text-[13px] max-sm:flex-1 gap-3 py-2 pr-4 pl-4 min-h-13 text-[15px] sm:min-h-16 sm:gap-4 sm:pr-5 sm:pl-6 sm:text-[17px]",
    row: "gap-2.5 py-3 pr-3.5 pl-3.5 min-h-13 text-[15px] sm:min-h-16 sm:gap-4 sm:py-2 sm:pr-5 sm:pl-6 sm:text-[17px]",
    inline: "gap-2 py-2 pr-2.5 pl-2.5 text-[11px] md:min-h-16 md:gap-4 md:pr-5 md:pl-6 md:text-[17px]",
  }[variant];
  const head = token.ca.slice(0, -10);
  const tail = token.ca.slice(-10);

  return (
    <div
      className={`max-w-full ${variant === "hero" ? "flex sm:inline-flex" : "inline-flex"} ${isInline ? "min-w-0" : ""} ${className}`}
    >
      <button
        type="button"
        onClick={handleClick}
        className={`${box} inline-flex min-w-0 items-center border-2 border-bone bg-night/80 text-bone transition-[background-color,scale] duration-150 ease-(--ease-out-strong) hover:bg-night focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone fine:active:scale-[0.98]`}
      >
        <span className={`font-medium text-bone/70 ${variant === "hero" ? "" : "max-md:hidden"}`}>{copyCa.label}</span>{" "}
        {isInline ? (
          <>
            <span ref={addressRef} aria-hidden className="flex min-w-0 text-left whitespace-nowrap select-all">
              <span className="min-w-0 truncate">{head}</span>
              <span>{tail}</span>
            </span>
            <span className="sr-only">{token.ca}</span>
          </>
        ) : (
          <span ref={addressRef} className={`min-w-0 text-left select-all ${variant === "hero" ? "break-all" : "break-words"}`}>
            {token.ca}
          </span>
        )}
        <span
          className={`ml-auto inline-flex shrink-0 items-center justify-end gap-1.5 text-[12px] font-medium sm:min-w-[84px] sm:text-[14px] ${isInline ? "max-md:min-w-0 max-md:text-[10px]" : ""}`}
        >
          {status === "copied" ? (
            <>
              <CheckIcon className={`text-signal ${isInline ? "max-md:size-3.5" : ""}`} />
              {copyCa.copied}
            </>
          ) : (
            <CopyIcon className={`text-bone/70 ${isInline ? "max-md:size-3.5" : ""}`} />
          )}
        </span>
        <span className="sr-only">, {copyCa.copy}</span>
      </button>
      <span aria-live="polite" className="sr-only">
        {status === "copied" ? copyCa.copied : status === "failed" ? copyCa.failed : ""}
      </span>
    </div>
  );
}
