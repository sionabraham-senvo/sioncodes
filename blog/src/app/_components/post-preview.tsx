import { type Author } from "@/interfaces/author";
import Image from "next/image";
import Link from "next/link";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <Link
      href={`/posts/${slug}`}
      className="group flex flex-col transition-all duration-300 hover:-translate-y-1"
    >
      <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
        <div className="transition-transform duration-500 group-hover:scale-[1.03]">
          <CoverImage slug={slug} title={title} src={coverImage} />
        </div>
      </div>
      <div className="relative z-10 -mt-12 md:-mt-16 mx-4 md:mx-6 rounded-xl bg-card border border-border shadow-md px-6 py-5 flex flex-col flex-1 group-hover:shadow-lg transition-shadow duration-300">
        <h3 className="font-serif text-xl md:text-2xl leading-tight font-semibold tracking-tight text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
          {excerpt}
        </p>
        <div className="mt-auto pt-5 flex items-center gap-3">
          <Image
            src={author.picture}
            alt={author.name}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full ring-2 ring-border object-cover"
          />
          <div className="leading-tight">
            <div className="text-sm font-medium text-foreground">{author.name}</div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
              <DateFormatter dateString={date} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
