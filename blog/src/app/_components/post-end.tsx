import Link from "next/link";
import { type Author } from "@/interfaces/author";
import { Post } from "@/interfaces/post";
import { AUTHOR_BIO, SOCIAL_LINKS } from "@/lib/site";
import { CopyLinkButton } from "./copy-link-button";
import CoverImage from "./cover-image";
import { PostMeta } from "./post-meta";
import Picture from "./picture";

type Props = {
  author: Author;
  /** Full address of this post, for the Copy link button. */
  url: string;
  /** The post to suggest next, or null when there is no other post. */
  next: Post | null;
};

const linkedIn = SOCIAL_LINKS.find((link) => link.label === "LinkedIn");

/**
 * Shown after the last paragraph: a way to share the post, one post to read next, a short
 * author note and ways to follow along.
 */
export function PostEnd({ author, url, next }: Props) {
  // A post with no cover is suggested as text only.
  const nextCover = next?.ogImage?.url || next?.coverImage;

  return (
    <section aria-label="After the article" className="mt-16 pt-10 border-t border-border">
      <CopyLinkButton url={url} />
      {next && (
        <>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mt-10 mb-4">
            Read next
          </h2>
          <Link
            href={`/posts/${next.slug}`}
            className={`group grid items-center gap-4 sm:gap-5 rounded-xl border border-border bg-card p-3 sm:p-4 shadow-sm hover:border-primary transition-colors ${
              nextCover ? "grid-cols-[6rem_minmax(0,1fr)] sm:grid-cols-[9rem_minmax(0,1fr)]" : "sm:px-5"
            }`}
          >
            {nextCover && (
              <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
                <CoverImage src={nextCover} fill />
              </div>
            )}
            <div className="min-w-0">
              <p className="font-serif text-lg sm:text-xl font-semibold leading-snug tracking-tight text-card-foreground group-hover:text-primary transition-colors">
                {next.title}
              </p>
              <PostMeta date={next.date} readingTime={next.readingTime} className="mt-1.5" />
            </div>
          </Link>
        </>
      )}

      <div className="mt-10 flex items-start gap-4">
        <Picture
          src={author.picture}
          alt=""
          width={56}
          height={56}
          className="w-14 h-14 shrink-0 rounded-full ring-2 ring-border object-cover"
        />
        <div className="min-w-0">
          <p className="text-base leading-relaxed text-foreground/90">
            <span className="font-semibold text-foreground">Written by {author.name}</span>, {AUTHOR_BIO}{" "}
            <Link href="/about" className="text-primary hover:underline underline-offset-2">
              More about me
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-muted-foreground">Get new posts:</span>
            <a
              href="/feed.xml"
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              RSS feed
            </a>
            {linkedIn && (
              <a
                href={linkedIn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-1.5 rounded-full border border-border font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
