"use client";

import styles from "./switch.module.css";
import { memo, useEffect, useState } from "react";
import { THEME_COLORS } from "@/lib/site";

declare global {
  interface Window {
    updateDOM?: () => void;
  }
}

type ColorSchemePreference = "system" | "dark" | "light";

const STORAGE_KEY = "nextjs-blog-starter-theme";
const modes: ColorSchemePreference[] = ["system", "dark", "light"];

/** Runs inline before the page paints, so it must be self-contained (it's serialised with toString). */
export const NoFOUCScript = (storageKey: string, themeColors: { light: string; dark: string }) => {
  const [SYSTEM, DARK, LIGHT] = ["system", "dark", "light"];

  const modifyTransition = () => {
    const css = document.createElement("style");
    css.textContent = "*,*:after,*:before{transition:none !important;}";
    document.head.appendChild(css);
    return () => {
      getComputedStyle(document.body);
      setTimeout(() => document.head.removeChild(css), 1);
    };
  };

  const media = matchMedia(`(prefers-color-scheme: ${DARK})`);

  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    const mode = localStorage.getItem(storageKey) ?? SYSTEM;
    const systemMode = media.matches ? DARK : LIGHT;
    const resolvedMode = mode === SYSTEM ? systemMode : mode;
    const classList = document.documentElement.classList;
    if (resolvedMode === DARK) classList.add(DARK);
    else classList.remove(DARK);
    document.documentElement.setAttribute("data-mode", mode);
    // Keep the mobile browser's toolbar colour in step with a manually chosen theme.
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute("content", resolvedMode === DARK ? themeColors.dark : themeColors.light);
    });
    restoreTransitions();
  };
  window.updateDOM();
  media.addEventListener("change", window.updateDOM);
};

const isMode = (value: unknown): value is ColorSchemePreference =>
  modes.includes(value as ColorSchemePreference);

const readStoredMode = (): ColorSchemePreference => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return isMode(stored) ? stored : "system";
};

export const ThemeToggle = () => {
  // Unknown until mounted: the server can't see the reader's stored preference.
  const [mode, setMode] = useState<ColorSchemePreference | null>(null);

  useEffect(() => {
    setMode(readStoredMode());

    // Another tab changed the theme.
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      setMode(readStoredMode());
      window.updateDOM?.();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const current = mode ?? "system";
  const next = modes[(modes.indexOf(current) + 1) % modes.length];

  const handleModeSwitch = () => {
    localStorage.setItem(STORAGE_KEY, next);
    setMode(next);
    window.updateDOM?.();
  };

  return (
    <button
      type="button"
      aria-label={`Theme: ${current}. Switch to ${next}.`}
      title={`Theme: ${current}`}
      className={styles.switch}
      onClick={handleModeSwitch}
    >
      {/* All three icons render; CSS shows the one matching <html data-mode>, so there's no flash on load. */}
      <svg className={`${styles.icon} ${styles.iconSystem}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" stroke="none" />
      </svg>
      <svg className={`${styles.icon} ${styles.iconLight}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4" />
      </svg>
      <svg className={`${styles.icon} ${styles.iconDark}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" aria-hidden>
        <path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.5 6.5 0 0 0 10 10z" />
      </svg>
    </button>
  );
};

export const ThemeScript = memo(() => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(${NoFOUCScript.toString()})(${JSON.stringify(STORAGE_KEY)}, ${JSON.stringify(THEME_COLORS)})`,
    }}
  />
));
ThemeScript.displayName = "ThemeScript";
