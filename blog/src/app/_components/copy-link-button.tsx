"use client";

import cn from "classnames";
import { useEffect, useRef, useState } from "react";

const COPIED_FOR_MS = 2000;

type Status = "idle" | "copied" | "failed";

const LABELS: Record<Status, string> = {
  idle: "Copy link",
  copied: "Link copied",
  failed: "Copy failed",
};

type Props = {
  /** The post's own address, so a #section the reader scrolled to isn't copied with it. */
  url: string;
};

/**
 * "Share this post: Copy link". Copying needs JavaScript, so the row only appears once the
 * page is interactive rather than showing a button that does nothing.
 */
export function CopyLinkButton({ url }: Props) {
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setReady(true);
    return () => clearTimeout(timer.current);
  }, []);

  if (!ready) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), COPIED_FOR_MS);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="text-muted-foreground">Share this post:</span>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border font-medium transition-colors",
          status === "copied"
            ? "border-primary text-primary"
            : "border-border text-foreground hover:border-primary hover:text-primary",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="w-4 h-4"
        >
          {status === "copied" ? (
            <path d="M20 6 9 17l-5-5" />
          ) : (
            <>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </>
          )}
        </svg>
        <span aria-live="polite">{LABELS[status]}</span>
      </button>
    </div>
  );
}
