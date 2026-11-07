import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
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

export function PostHeader({ title, coverImage, date, readingTime, author, excerpt, tags }: Props) {
  return (
    <header className="mb-12 md:mb-16">
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
      <div className="relative overflow-hidden rounded-2xl border border-border shadow-sm aspect-[4/3] sm:aspect-[2/1] lg:aspect-[21/9]">
        <CoverImage title={title} src={coverImage} priority fill />
      </div>
      <div className="relative z-10 -mt-16 md:-mt-24 mx-4 md:mx-10 rounded-xl bg-card border border-border shadow-lg px-6 md:px-10 pt-6 md:pt-8 pb-6 md:pb-10">
        <PostTitle>{title}</PostTitle>
        <p className="mt-6 text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl">
          {excerpt}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <Avatar name={author.name} picture={author.picture} />
          <span aria-hidden className="opacity-40">
            ·
          </span>
          <DateFormatter dateString={date} />
          <span aria-hidden className="opacity-40">
            ·
          </span>
          <span>{readingTime} min read</span>
        </div>
      </div>
    </header>
  );
}
