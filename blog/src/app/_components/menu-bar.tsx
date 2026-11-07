"use client";

import cn from "classnames";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type NavLink = { label: string; href: string };

type Props = {
  /** Tag pages, shown between Home and About. */
  tagLinks: NavLink[];
};

// Slots in the bar (Home + tags + About) per breakpoint. Phones always put tags in the dropdown.
const MEDIUM_MAX_VISIBLE = 4;
const LARGE_MAX_VISIBLE = 6;

const itemClass =
  "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors";

export default function MenuBar({ tagLinks }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // How many tags fit in the bar. When they don't all fit, Home, About and the
  // "More" button take three slots and the remaining tags go into the dropdown.
  const inlineTagCount = (maxVisible: number) =>
    tagLinks.length + 2 <= maxVisible ? tagLinks.length : Math.max(0, maxVisible - 3);
  const mediumInline = inlineTagCount(MEDIUM_MAX_VISIBLE);
  const largeInline = inlineTagCount(LARGE_MAX_VISIBLE);
  const mediumOverflows = mediumInline < tagLinks.length;
  const largeOverflows = largeInline < tagLinks.length;

  // Visibility is done with breakpoint classes rather than JS so the static HTML is
  // already correct on first paint.
  const inlineClass = (index: number) => {
    if (index < mediumInline) return "hidden sm:block";
    if (index < largeInline) return "hidden lg:block";
    return null;
  };
  const dropdownClass = (index: number) => {
    if (index < mediumInline) return "sm:hidden";
    if (index < largeInline) return "lg:hidden";
    return "";
  };
  const moreButtonClass = !mediumOverflows ? "sm:hidden" : !largeOverflows ? "lg:hidden" : "";

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <nav aria-label="Main">
      <ul className="flex flex-wrap items-center justify-center md:justify-end gap-1 rounded-full border border-border bg-card/60 backdrop-blur-md px-2 py-1.5">
        <li className="hidden sm:block">
          <Link href="/" className={itemClass}>
            Home
          </Link>
        </li>

        {tagLinks.map((link, index) => {
          const visibility = inlineClass(index);
          if (!visibility) return null;
          return (
            <li key={link.href} className={visibility}>
              <Link href={link.href} className={itemClass}>
                {link.label}
              </Link>
            </li>
          );
        })}

        <li>
          <Link href="/about" className={itemClass}>
            About
          </Link>
        </li>

        {tagLinks.length > 0 && (
          <li className={cn("relative", moreButtonClass)} ref={dropdownRef}>
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className={itemClass}
              aria-expanded={isOpen}
              aria-controls="nav-more-menu"
            >
              <span className="sm:hidden">Menu</span>
              <span className="hidden sm:inline">More</span>
              <span aria-hidden className="ml-1 text-xs">
                ▾
              </span>
            </button>

            {isOpen && (
              <ul
                id="nav-more-menu"
                className="absolute top-full right-0 mt-2 min-w-[10rem] rounded-xl border border-border bg-card shadow-lg py-2 z-20"
              >
                {tagLinks.map((link, index) => (
                  <li key={link.href} className={dropdownClass(index)}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}
