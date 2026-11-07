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
  /**
   * Optional vertical wordmark rendered to the left of the card (desktop only). It's
   * decorative, so the page should also render its own <h1>.
   */
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
  // Rough length of the label in ems (Source Serif runs up to ~0.56em per character with capitals). The font
  // size below is capped so the label is never taller than the hero image next to it, which is
  // about 348px tall at md, 405px at lg and 509px at xl.
  const labelEms = ((verticalLabel?.length ?? 0) * 0.56).toFixed(2);

  return (
    <section className="relative mb-20 md:mb-28 md:pl-8 lg:pl-10 xl:pl-[3.25rem]">
      {hasLabel && (
        <div
          id={verticalLabelId}
          aria-hidden
          style={
            {
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              "--label-ems": labelEms,
            } as React.CSSProperties
          }
          className="hidden md:block absolute left-0 top-0 z-20
                     font-serif font-semibold leading-none tracking-tighter
                     text-foreground select-none pointer-events-none
                     text-[length:min(4rem,calc(348px/var(--label-ems)))]
                     lg:text-[length:min(5rem,calc(405px/var(--label-ems)))]
                     xl:text-[length:min(6.5rem,calc(509px/var(--label-ems)))]"
        >
          {labelBody}
          {labelEndsWithDot && <span className="text-primary">.</span>}
        </div>
      )}
      <Link
        href={`/posts/${slug}`}
        className="group flex flex-col relative z-10"
      >
        <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
          <div className="relative aspect-[4/3] sm:aspect-[2/1] lg:aspect-[21/9] transition-transform duration-500 group-hover:scale-[1.02]">
            <CoverImage title={title} src={coverImage} priority fill />
          </div>
        </div>
        <div className="relative z-10 -mt-16 md:-mt-24 mx-4 md:mx-10 rounded-xl bg-card border border-border shadow-lg px-6 md:px-10 pt-6 md:pt-8 pb-6 md:pb-10 group-hover:shadow-xl transition-shadow duration-300">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
            <span className="h-px w-6 bg-primary" /> Featured
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </h2>
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
