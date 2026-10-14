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
    <div className={`inline-flex ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        aria-label={`${copyCa.copy}: ${token.ca}`}
        className="inline-flex h-16 items-center gap-4 border-2 border-bone bg-night/80 pr-5 pl-6 text-[17px] text-bone transition-[background-color,scale] duration-150 ease-(--ease-out-strong) hover:bg-night focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone active:scale-[0.98]"
      >
        <span className="font-medium text-bone/70">{copyCa.label}</span>
        <span ref={addressRef} className="select-all">
          {token.ca}
        </span>
        <span className="inline-flex min-w-[84px] items-center justify-end gap-1.5 text-[14px] font-medium">
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
