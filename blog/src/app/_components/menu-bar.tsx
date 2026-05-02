"use client";

import { useState, useRef, useEffect } from "react";
import { createUrl } from "@/lib/url";

interface MenuBarProps {
  items?: string[];
}

const MenuBar = ({ items = ["Home", "About"] }: MenuBarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [screenSize, setScreenSize] = useState<"small" | "medium" | "large">("large");
  const dropdownRef = useRef<HTMLLIElement>(null);

  const processItems = () => {
    const middleItems = items.filter((item) => item !== "Home" && item !== "About");
    return ["Home", ...middleItems, "About"];
  };

  const allItems = processItems();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("small");
      else if (width < 1024) setScreenSize("medium");
      else setScreenSize("large");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let visibleItems: string[];
  let dropdownItems: string[];

  if (screenSize === "small") {
    visibleItems = [allItems[0], allItems[allItems.length - 1]];
    dropdownItems = allItems.slice(1, allItems.length - 1);
  } else if (screenSize === "medium") {
    const MED_MAX_VISIBLE = 4;
    if (allItems.length <= MED_MAX_VISIBLE) {
      visibleItems = allItems;
      dropdownItems = [];
    } else {
      visibleItems = [
        allItems[0],
        ...allItems.slice(1, MED_MAX_VISIBLE - 2),
        allItems[allItems.length - 1],
      ];
      dropdownItems = allItems.slice(MED_MAX_VISIBLE - 2, allItems.length - 1);
    }
  } else {
    const LARGE_MAX_VISIBLE = 6;
    if (allItems.length <= LARGE_MAX_VISIBLE) {
      visibleItems = allItems;
      dropdownItems = [];
    } else {
      visibleItems = [
        allItems[0],
        ...allItems.slice(1, LARGE_MAX_VISIBLE - 2),
        allItems[allItems.length - 1],
      ];
      dropdownItems = allItems.slice(LARGE_MAX_VISIBLE - 2, allItems.length - 1);
    }
  }

  const getItemUrl = (item: string): string => {
    if (item.toLowerCase() === "home") return createUrl("/");
    if (item.toLowerCase() === "about") return createUrl("/about");
    return createUrl(`/tags/${item.toLowerCase()}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav>
      <ul className="flex flex-wrap items-center justify-center md:justify-end gap-1 rounded-full border border-border bg-card/60 backdrop-blur-md px-2 py-1.5">
        {visibleItems.map((item) => (
          <li key={item}>
            <a
              href={getItemUrl(item)}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              {item}
            </a>
          </li>
        ))}

        {dropdownItems.length > 0 && (
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="More menu items"
              aria-expanded={isDropdownOpen}
            >
              {screenSize === "small" ? "Menu" : "More"}
              <span aria-hidden className="ml-1 text-xs">▾</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 min-w-[10rem] rounded-xl border border-border bg-card shadow-lg py-2 z-20">
                {dropdownItems.map((item) => (
                  <a
                    key={item}
                    href={getItemUrl(item)}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors whitespace-nowrap"
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MenuBar;
