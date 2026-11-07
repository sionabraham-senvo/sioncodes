import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  const asRows = posts.length < 3;
  return (
    <section className="mb-32">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="font-serif text-h1-fluid font-semibold tracking-tight">
          More stories<span className="text-primary">.</span>
        </h2>
        <span className="text-sm text-muted-foreground">{posts.length} more</span>
      </div>
      <div className={asRows ? "grid grid-cols-1 gap-16" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={asRows ? post.ogImage?.url || post.coverImage : post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            layout={asRows ? "row" : "card"}
          />
        ))}
      </div>
    </section>
  );
}
