import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Image from "next/image";
import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  /** Optional vertical wordmark rendered to the left of the card. */
  verticalLabel?: string;
  /** id forwarded to the vertical label (used by the sticky nav observer). */
  verticalLabelId?: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  verticalLabel,
  verticalLabelId,
}: Props) {
  const hasLabel = Boolean(verticalLabel);
  const labelEndsWithDot = verticalLabel?.endsWith(".") ?? false;
  const labelBody = labelEndsWithDot ? verticalLabel!.slice(0, -1) : verticalLabel;

  return (
    <section className="relative mb-20 md:mb-28">
      {hasLabel && (
        <h2
          id={verticalLabelId}
          aria-label={verticalLabel}
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
          className="hidden md:block absolute -left-10 lg:-left-14 xl:-left-[4.5rem] top-0 z-20
                     font-serif font-semibold leading-none tracking-tighter
                     text-foreground select-none pointer-events-none
                     text-[5rem] lg:text-[7rem] xl:text-[9rem]"
        >
          {labelBody}
          {labelEndsWithDot && <span className="text-primary">.</span>}
        </h2>
      )}
      <Link
        href={`/posts/${slug}`}
        className="group flex flex-col relative z-10"
      >
        <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
          <div className="transition-transform duration-500 group-hover:scale-[1.02]">
            <CoverImage title={title} src={coverImage} />
          </div>
        </div>
        <div className="relative z-10 -mt-16 md:-mt-24 mx-4 md:mx-10 rounded-xl bg-card border border-border shadow-lg px-6 md:px-10 pt-6 md:pt-8 pb-6 md:pb-10 group-hover:shadow-xl transition-shadow duration-300">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            <span className="h-px w-6 bg-primary" /> Featured
          </span>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground max-w-3xl">
            {excerpt}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Image
              src={author.picture}
              alt={author.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full ring-2 ring-border object-cover"
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
    </section>
  );
}
