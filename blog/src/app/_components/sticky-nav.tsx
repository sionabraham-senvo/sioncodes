"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MenuBar, { type NavLink } from "./menu-bar";
import { ThemeToggle } from "./theme-switcher";
import { SITE_NAME } from "@/lib/site";

type Props = {
  tagLinks: NavLink[];
  showBrand?: boolean;
  /** Watch the #site-hero-mark element to drive the brand reveal/swap. */
  condenseOnScroll?: boolean;
  /** Brand text shown by default. */
  brandText?: string;
  /** Optional alternate brand text shown when scrolled past the hero (e.g. tag name). */
  condensedBrandText?: string;
};

const renderBrand = (text: string) => {
  const dotted = text.endsWith(".");
  const body = dotted ? text.slice(0, -1) : text;
  return (
    <>
      {body}
      {dotted && <span className="text-primary">.</span>}
    </>
  );
};

export default function StickyNav({
  tagLinks,
  showBrand = true,
  condenseOnScroll = false,
  brandText = SITE_NAME,
  condensedBrandText,
}: Props) {
  const hasSwap = condenseOnScroll && Boolean(condensedBrandText);
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    if (!condenseOnScroll || !showBrand) return;
    const target = document.getElementById("site-hero-mark");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolledPast(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [condenseOnScroll, showBrand]);

  // Reveal-mode (no swap): hidden until scroll, then fade-in from left.
  const revealHidden = condenseOnScroll && !hasSwap && !scrolledPast;

  return (
    <header className="sticky top-0 z-50 bg-background/95 supports-[backdrop-filter]:bg-background/85 backdrop-blur-md transition-colors">
      <div className="container mx-auto px-5 h-14 md:h-16 flex items-center gap-3">
        {showBrand &&
          (hasSwap ? (
            <Link
              href="/"
              aria-label="SiônCodes home"
              className="relative font-serif text-xl md:text-2xl font-semibold tracking-tight hover:text-primary transition-colors"
            >
              <span
                className={`inline-block transition-opacity duration-300 ${
                  scrolledPast ? "opacity-0" : "opacity-100"
                }`}
              >
                {renderBrand(brandText)}
              </span>
              <span
                aria-hidden={!scrolledPast}
                className={`absolute left-0 top-0 inline-block transition-opacity duration-300 ${
                  scrolledPast ? "opacity-100" : "opacity-0"
                }`}
              >
                {renderBrand(condensedBrandText!)}
              </span>
            </Link>
          ) : (
            <Link
              href="/"
              aria-label="SiônCodes home"
              className={`font-serif text-xl md:text-2xl font-semibold tracking-tight hover:text-primary transition-all duration-300 ${
                revealHidden
                  ? "opacity-0 -translate-x-2 pointer-events-none"
                  : "opacity-100 translate-x-0"
              }`}
            >
              {renderBrand(brandText)}
            </Link>
          ))}
        <div className="ml-auto flex items-center gap-3">
          <MenuBar tagLinks={tagLinks} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
