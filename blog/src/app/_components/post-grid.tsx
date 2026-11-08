import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

/**
 * Wide rows while there are only one or two posts, so a lone card never sits in the
 * first column of an otherwise empty three-column grid. Cards from three posts up.
 */
export function PostGrid({ posts }: Props) {
  const asRows = posts.length < 3;
  return (
    <div className={asRows ? "grid grid-cols-1 gap-16" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          // Rows crop the wide 3:2 cover; cards use the square one.
          coverImage={asRows ? post.ogImage?.url || post.coverImage : post.coverImage}
          date={post.date}
          slug={post.slug}
          excerpt={post.excerpt}
          readingTime={post.readingTime}
          tags={post.tags}
          layout={asRows ? "row" : "card"}
        />
      ))}
    </div>
  );
}
