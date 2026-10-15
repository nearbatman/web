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

export function CopyCA({ className = "" }: { className?: string }) {
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

  return (
    <div className={`flex max-w-full sm:inline-flex ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        aria-label={`${copyCa.copy}: ${token.ca}`}
        className="inline-flex min-h-16 short-mobile:min-h-12 min-w-0 max-sm:flex-1 items-center gap-3 border-2 border-bone bg-night/80 py-2 pr-4 pl-4 text-[13px] sm:gap-4 sm:pr-5 sm:pl-6 sm:text-[17px] text-bone transition-[background-color,scale] duration-150 ease-(--ease-out-strong) hover:bg-night focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone active:scale-[0.98]"
      >
        <span className="font-medium text-bone/70">{copyCa.label}</span>
        <span ref={addressRef} className="min-w-0 break-all text-left select-all">
          {token.ca}
        </span>
        <span className="ml-auto inline-flex shrink-0 items-center justify-end gap-1.5 text-[12px] font-medium sm:min-w-[84px] sm:text-[14px]">
          {status === "copied" ? (
            <>
              <CheckIcon className="text-signal" />
              {copyCa.copied}
            </>
          ) : (
            <CopyIcon className="text-bone/70" />
          )}
        </span>
      </button>
      <span aria-live="polite" className="sr-only">
        {status === "copied" ? copyCa.copied : status === "failed" ? copyCa.failed : ""}
      </span>
    </div>
  );
}
