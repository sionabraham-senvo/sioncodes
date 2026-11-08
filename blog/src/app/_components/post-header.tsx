import Avatar from "./avatar";
import CoverImage from "./cover-image";
import { PostMeta } from "./post-meta";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";
import { tagSlug } from "@/lib/api";
import Link from "next/link";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  readingTime: number;
  author: Author;
  excerpt: string;
  tags?: string[];
};

/**
 * Text first, so the article starts on the first screen: title, excerpt and byline on the
 * left with the cover beside them on large screens, and the cover below them on phones.
 */
export function PostHeader({ title, coverImage, date, readingTime, author, excerpt, tags }: Props) {
  return (
    <header className="mb-12 md:mb-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-center lg:gap-14">
      <div className="min-w-0">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tagSlug(tag)}`}
                className="inline-flex items-center text-xs font-medium uppercase tracking-[0.18em] px-3 py-1 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        <PostTitle>{title}</PostTitle>
        <p className="mt-5 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-2xl">{excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <Avatar name={author.name} picture={author.picture} />
          <PostMeta date={date} readingTime={readingTime} />
        </div>
      </div>
      {coverImage && (
        <div className="relative overflow-hidden rounded-2xl border border-border shadow-sm aspect-[2/1] lg:aspect-[4/3]">
          <CoverImage src={coverImage} priority fill />
        </div>
      )}
    </header>
  );
}
