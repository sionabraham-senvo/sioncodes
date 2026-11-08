"use client";

import cn from "classnames";
import { useEffect, useState } from "react";
import type { Heading } from "@/lib/markdownToHtml";

type Props = {
  headings: Heading[];
};

/** How far below the top of the window a heading counts as the current section (clears the sticky header). */
const ACTIVE_OFFSET_PX = 120;

export function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    // Browsers fire scroll at most once per frame, and this reads a handful of positions,
    // so it runs directly in the handler.
    const update = () => {
      // The current section is the last heading that has scrolled past the offset line.
      let current: string | null = null;
      for (const element of elements) {
        if (element.getBoundingClientRect().top <= ACTIVE_OFFSET_PX) current = element.id;
        else break;
      }
      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [headings]);

  return (
    <nav aria-labelledby="toc-heading" className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2
        id="toc-heading"
        className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4"
      >
        On this page
      </h2>
      <ol className="border-l border-border">
        {headings.map((heading) => {
          const active = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l-2 py-1.5 pl-3.5 text-sm leading-snug transition-colors",
                  active
                    ? "border-primary font-medium text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
