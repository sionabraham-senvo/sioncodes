"use client";

import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import styles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });

    document.querySelectorAll("blockquote").forEach((blockquote) => {
      const firstParagraph = blockquote.querySelector("p:first-child");
      if (!firstParagraph) return;
      const strongText = firstParagraph.querySelector("strong")?.textContent ?? "";
      if (strongText === "Note") {
        blockquote.classList.add(styles.calloutNote);
        firstParagraph.classList.add(styles.calloutHeading);
      } else if (strongText === "Warning") {
        blockquote.classList.add(styles.calloutWarning);
        firstParagraph.classList.add(styles.calloutHeading);
      } else if (strongText === "Tip") {
        blockquote.classList.add(styles.calloutTip);
        firstParagraph.classList.add(styles.calloutHeading);
      }
    });
  }, [content]);

  return (
    <article
      className={`${styles.markdown} prose prose-lg max-w-none font-serif
        prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-foreground
        prose-p:text-foreground/90 prose-p:leading-relaxed
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground
        prose-blockquote:border-primary prose-blockquote:text-muted-foreground
        prose-code:font-mono prose-code:text-[0.95em] prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
        prose-pre:rounded-xl prose-pre:border prose-pre:border-border
        prose-img:rounded-xl prose-img:shadow-md
        prose-hr:border-border
        dark:prose-invert`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
