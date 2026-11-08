"use client";

import { useEffect } from "react";

const COPIED_FOR_MS = 2000;

/**
 * Enhances the code blocks rendered by rehypeCodeBlocks (src/lib/markdownToHtml.ts):
 * reveals the Copy buttons, and marks a block while it can still scroll sideways so the
 * CSS can fade its right edge. Without JavaScript the blocks still render and scroll.
 */
export function CodeBlockControls() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>(".code-block").forEach((block) => {
      const button = block.querySelector<HTMLButtonElement>("[data-copy-code]");
      const body = block.querySelector<HTMLElement>(".code-block-body");
      const pre = body?.querySelector("pre");
      if (!body || !pre) return;

      if (button) {
        let timer: ReturnType<typeof setTimeout> | undefined;
        const copy = async () => {
          try {
            await navigator.clipboard.writeText(pre.innerText.replace(/\n$/, ""));
            button.textContent = "Copied";
          } catch {
            button.textContent = "Copy failed";
          }
          clearTimeout(timer);
          timer = setTimeout(() => (button.textContent = "Copy"), COPIED_FOR_MS);
        };
        button.hidden = false;
        button.addEventListener("click", copy);
        cleanups.push(() => {
          button.removeEventListener("click", copy);
          clearTimeout(timer);
        });
      }

      const updateFade = () => {
        const canScrollRight = pre.scrollLeft + pre.clientWidth < pre.scrollWidth - 1;
        body.toggleAttribute("data-overflowing", canScrollRight);
      };
      updateFade();
      pre.addEventListener("scroll", updateFade, { passive: true });
      const observer = new ResizeObserver(updateFade);
      observer.observe(pre);
      cleanups.push(() => {
        pre.removeEventListener("scroll", updateFade);
        observer.disconnect();
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
