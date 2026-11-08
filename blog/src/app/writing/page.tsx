import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/app/_components/container";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import { getAllPosts, getAllTags, tagSlug } from "@/lib/api";
import { Post } from "@/interfaces/post";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Writing",
  description: `Every article on ${SITE_NAME}, newest first.`,
  alternates: { canonical: "/writing" },
};

// Same fixed time zone as DateFormatter, so dates match the rest of the site.
const yearFormatter = new Intl.DateTimeFormat("en-GB", { year: "numeric", timeZone: "Europe/Berlin" });
const dayFormatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Europe/Berlin" });

/** Posts grouped by year, newest year first (posts are already sorted newest first). */
function groupByYear(posts: Post[]) {
  const years = new Map<string, Post[]>();
  for (const post of posts) {
    const year = yearFormatter.format(new Date(post.date));
    years.set(year, [...(years.get(year) ?? []), post]);
  }
  return Array.from(years);
}

export default function WritingPage() {
  const posts = getAllPosts();
  const tags = getAllTags(posts).map((tag) => ({
    tag,
    count: posts.filter((post) => (post.tags ?? []).some((t) => tagSlug(t) === tagSlug(tag))).length,
  }));

  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="max-w-3xl mx-auto py-8 md:py-12">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3 tabular-nums">
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </p>
            <h1 className="font-serif text-display font-semibold tracking-tighter">
              Writing<span className="text-primary">.</span>
            </h1>

            {tags.length > 0 && (
              <nav aria-label="Topics" className="mt-8">
                <ul className="flex flex-wrap gap-2">
                  {tags.map(({ tag, count }) => (
                    <li key={tag}>
                      <Link
                        href={`/tags/${tagSlug(tag)}`}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                      >
                        {tag}
                        <span className="text-xs tabular-nums opacity-70">{count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {groupByYear(posts).map(([year, yearPosts]) => (
              <section key={year} aria-labelledby={`year-${year}`} className="mt-12">
                <h2
                  id={`year-${year}`}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground tabular-nums pb-3 border-b border-border"
                >
                  {year}
                </h2>
                <ul>
                  {yearPosts.map((post) => (
                    <li key={post.slug} className="border-b border-border">
                      <Link
                        href={`/posts/${post.slug}`}
                        className="group grid grid-cols-[4.5rem_minmax(0,1fr)] sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 py-4"
                      >
                        <time dateTime={post.date} className="text-sm text-muted-foreground tabular-nums">
                          {dayFormatter.format(new Date(post.date))}
                        </time>
                        <span className="font-serif text-lg md:text-xl font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </span>
                        <span className="col-start-2 sm:col-start-auto text-sm text-muted-foreground tabular-nums whitespace-nowrap">
                          {post.readingTime} min read
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
