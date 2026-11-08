import Link from "next/link";
import CoverImage from "./cover-image";
import { PostMeta, TagChips } from "./post-meta";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  slug: string;
  readingTime: number;
  tags?: string[];
  layout?: "card" | "row";
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  readingTime,
  tags,
  layout = "card",
}: Props) {
  if (layout === "row") {
    return <PostRow {...{ title, coverImage, date, excerpt, slug, readingTime, tags }} />;
  }

  return (
    <Link
      href={`/posts/${slug}`}
      className="group flex flex-col transition-all duration-300 hover:-translate-y-1"
    >
      <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
        <div className="transition-transform duration-500 group-hover:scale-[1.03]">
          <CoverImage src={coverImage} />
        </div>
      </div>
      <div className="relative z-10 -mt-12 md:-mt-16 mx-4 md:mx-6 rounded-xl bg-card border border-border shadow-md px-6 py-5 flex flex-col flex-1 group-hover:shadow-lg transition-shadow duration-300">
        <h3 className="font-serif text-xl md:text-2xl leading-tight font-semibold tracking-tight text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
          {excerpt}
        </p>
        <div className="mt-auto pt-5">
          <PostMeta date={date} readingTime={readingTime} />
          <TagChips tags={tags} className="mt-3" />
        </div>
      </div>
    </Link>
  );
}

/** Wide variant used while there are only one or two posts to show: image left, card overlapping right. */
function PostRow({ title, coverImage, date, excerpt, slug, readingTime, tags }: Omit<Props, "layout">) {
  return (
    <Link
      href={`/posts/${slug}`}
      className="group grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center"
    >
      <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
        <div className="relative aspect-[3/2] transition-transform duration-500 group-hover:scale-[1.03]">
          <CoverImage src={coverImage} fill />
        </div>
      </div>
      <div className="relative z-10 -mt-12 mx-4 md:mt-0 md:mx-0 md:-ml-16 rounded-xl bg-card border border-border shadow-md px-6 md:px-10 py-6 md:py-9 group-hover:shadow-lg transition-shadow duration-300">
        <h3 className="font-serif text-2xl md:text-3xl leading-tight font-semibold tracking-tight text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed line-clamp-3">{excerpt}</p>
        <PostMeta date={date} readingTime={readingTime} className="mt-6" />
        <TagChips tags={tags} className="mt-3" />
      </div>
    </Link>
  );
}
