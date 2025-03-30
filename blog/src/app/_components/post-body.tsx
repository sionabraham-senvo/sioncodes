"use client"

import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import markdownStyles from "./markdown-styles.module.css";

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

        if (strongText === 'Note' || strongText === 'Warning' || strongText === 'Tip') {
          const type = strongText.toLowerCase();
          blockquote.classList.add(markdownStyles[`callout-${type}`]);
          firstParagraph.classList.add(markdownStyles['callout-heading']);
        }
      }
    });
  }, [content]);

  return (
    <div className="max-w-4xl mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}