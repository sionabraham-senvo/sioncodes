import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getAllTags, tagSlug } from "@/lib/api";
import { SITE_NAME } from "@/lib/site";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import { HeroPost } from "@/app/_components/hero-post";
import { TagPostsList } from "@/app/_components/tag-posts-list";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

// Only tags returned by generateStaticParams exist; anything else is a 404.
export const dynamicParams = false;

/** The tag as written in the posts' frontmatter, e.g. "postgresql" -> "PostgreSQL". */
function findTag(slug: string) {
  return getAllTags().find((tag) => tagSlug(tag) === slug);
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: slug } = await params;
  const tag = findTag(slug);
  if (!tag) notFound();

  const tagPosts = getAllPosts().filter((post) =>
    (post.tags ?? []).some((t) => tagSlug(t) === slug),
  );
  const [firstPost, ...restPosts] = tagPosts;
  const label = `${tag}.`;

  return (
    <>
      <Header condenseOnScroll condensedBrandText={label} />
      <main>
        <Container>
          <div className="pt-8 md:pt-12 mb-8 md:mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Tag · {tagPosts.length} {tagPosts.length === 1 ? "article" : "articles"}
            </p>
            {/* Visible on mobile; on desktop the large vertical label next to the hero shows the tag. */}
            <h1 className="font-serif text-h1-fluid font-semibold tracking-tight md:sr-only">
              {tag}
              <span className="text-primary">.</span>
            </h1>
          </div>
          {firstPost && (
            <HeroPost
              title={firstPost.title}
              coverImage={firstPost.ogImage.url}
              date={firstPost.date}
              author={firstPost.author}
              slug={firstPost.slug}
              excerpt={firstPost.excerpt}
              verticalLabel={label}
              verticalLabelId="site-hero-mark"
            />
          )}
          {restPosts.length > 0 && <TagPostsList posts={restPosts} tag={tag} />}
        </Container>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = findTag(slug);
  if (!tag) notFound();

  return {
    title: `Posts tagged ${tag}`,
    description: `Articles about ${tag} on ${SITE_NAME}`,
    alternates: { canonical: `/tags/${slug}` },
  };
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tagSlug(tag) }));
}
