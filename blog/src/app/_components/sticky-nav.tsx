"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MenuBar from "./menu-bar";
import { ThemeToggle } from "./theme-switcher";

type Props = {
  menuItems: string[];
  showBrand?: boolean;
  condenseOnScroll?: boolean;
};

export default function StickyNav({
  menuItems,
  showBrand = true,
  condenseOnScroll = false,
}: Props) {
  const [showCondensedBrand, setShowCondensedBrand] = useState(
    showBrand && !condenseOnScroll,
  );

  useEffect(() => {
    if (!condenseOnScroll || !showBrand) return;
    const target = document.getElementById("site-hero-mark");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowCondensedBrand(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [condenseOnScroll, showBrand]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 supports-[backdrop-filter]:bg-background/85 backdrop-blur-md transition-colors">
      <div className="container mx-auto px-5 h-14 md:h-16 flex items-center gap-3">
        {showBrand && (
          <Link
            href="/"
            aria-label="SiônCodes home"
            className={`font-serif text-xl md:text-2xl font-semibold tracking-tight hover:text-primary transition-all duration-300 ${
              showCondensedBrand
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2 pointer-events-none"
            }`}
          >
            SiônCodes<span className="text-primary">.</span>
          </Link>
        )}
        <div className="ml-auto flex items-center gap-3">
          <MenuBar items={menuItems} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
