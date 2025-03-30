// blog/src/app/tags/[tag]/page.tsx
import { getAllPosts } from "@/lib/api";
import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { TagPostsList } from "@/app/_components/tag-posts-list";
import MenuBar from "@/app/_components/menu-bar";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export default function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const allPosts = getAllPosts();

  // Get all unique tags for the MenuBar
  const allTags = [...new Set(allPosts.flatMap(post => post.tags || []))];

  // Filter posts by the current tag
  const tagPosts = allPosts.filter(post => {
    const postTags = post.tags || [];
    return postTags.map(t => t.toLowerCase()).includes(tag.toLowerCase());
  });

  // Format tag name for display (capitalize)
  const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        <div className="my-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-4">
            Articles on {formattedTag}
          </h1>
          {tagPosts.length > 0 ? (
            <TagPostsList posts={tagPosts} tag={formattedTag} />
          ) : (
            <p className="text-lg py-8">No posts found for this tag.</p>
          )}
        </div>
      </Container>
    </main>
  );
}

// Generate static paths for all tags
export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set<string>();

  posts.forEach(post => {
    const postTags = post.tags || [];
    postTags.forEach(tag => {
      tags.add(tag.toLowerCase());
    });
  });

  return Array.from(tags).map(tag => ({
    tag: tag,
  }));
}