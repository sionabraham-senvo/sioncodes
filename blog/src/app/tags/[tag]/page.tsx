import { getAllPosts } from "@/lib/api";
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

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const allPosts = getAllPosts();

  const tagPosts = allPosts.filter((post) => {
    const postTags = post.tags || [];
    return postTags.map((t) => t.toLowerCase()).includes(tag.toLowerCase());
  });

  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);
  const [firstPost, ...restPosts] = tagPosts;

  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="pt-8 md:pt-12 mb-8 md:mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Tag · {tagPosts.length} {tagPosts.length === 1 ? "article" : "articles"}
            </p>
          </div>
          {firstPost ? (
            <>
              <HeroPost
                title={firstPost.title}
                coverImage={firstPost.ogImage.url}
                date={firstPost.date}
                author={firstPost.author}
                slug={firstPost.slug}
                excerpt={firstPost.excerpt}
                verticalLabel={`${formattedTag}.`}
              />
              {restPosts.length > 0 && (
                <TagPostsList posts={restPosts} tag={formattedTag} />
              )}
            </>
          ) : (
            <p className="text-lg text-muted-foreground py-8">
              No posts found for this tag.
            </p>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    const postTags = post.tags || [];
    postTags.forEach((tag) => {
      tags.add(tag.toLowerCase());
    });
  });

  return Array.from(tags).map((tag) => ({
    tag: tag,
  }));
}
