"use client";

import cn from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
] as const;

export default function MenuBar() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main">
      <ul className="flex items-center gap-1 rounded-full border border-border bg-card/60 backdrop-blur-md px-2 py-1.5">
        {LINKS.map((link) => {
          const current = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  current
                    ? "text-foreground bg-muted/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
