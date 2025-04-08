"use client"

import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Changed to a more modern style
import styles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  useEffect(() => {
    // Highlight code blocks
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block as HTMLElement);
    });

    // Style note blocks
    document.querySelectorAll('blockquote').forEach((blockquote) => {
      const firstParagraph = blockquote.querySelector('p:first-child');
      if (firstParagraph && firstParagraph.innerHTML.trim().startsWith('<strong>')) {
        const strongText = firstParagraph.querySelector('strong')?.textContent || '';

        if (strongText === 'Note') {
          blockquote.classList.add(styles.calloutNote);
          firstParagraph.classList.add(styles.calloutHeading);
        } else if (strongText === 'Warning') {
          blockquote.classList.add(styles.calloutWarning);
          firstParagraph.classList.add(styles.calloutHeading);
        } else if (strongText === 'Tip') {
          blockquote.classList.add(styles.calloutTip);
          firstParagraph.classList.add(styles.calloutHeading);
        }
      }
    });
  }, [content]);

  return (
    <div className="max-w-4xl mx-auto bg-champagne dark:bg-space-black text-licorice dark:text-white p-6 rounded-lg shadow-md" style={{ borderLeft: "4px solid var(--primary)" }}>
      <div
        className={styles.markdown}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}