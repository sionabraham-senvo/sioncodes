import cn from "classnames";
import DateFormatter from "./date-formatter";

type MetaProps = {
  date: string;
  readingTime: number;
  className?: string;
};

/**
 * "4 April 2025 · 6 min read". In a narrow column the reading time drops to a second line;
 * the separator stays with the date so it never wraps on its own.
 */
export function PostMeta({ date, readingTime, className }: MetaProps) {
  return (
    <p className={cn("flex flex-wrap gap-x-1.5 text-sm text-muted-foreground tabular-nums", className)}>
      <span className="whitespace-nowrap">
        <DateFormatter dateString={date} />
        <span aria-hidden className="ml-1.5 opacity-60">
          ·
        </span>
      </span>
      <span className="whitespace-nowrap">{readingTime} min read</span>
    </p>
  );
}

type TagChipsProps = {
  tags?: string[];
  className?: string;
};

/** Plain (non-link) tag labels for use inside a card that is already a link. */
export function TagChips({ tags, className }: TagChipsProps) {
  if (!tags || tags.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Tags">
      {tags.map((tag) => (
        <li
          key={tag}
          className="text-[0.7rem] font-medium uppercase tracking-[0.14em] px-2.5 py-0.5 rounded-full border border-border text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
