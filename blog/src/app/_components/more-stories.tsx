import { Post } from "@/interfaces/post";
import { PostGrid } from "./post-grid";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section className="mb-32">
      <h2 className="font-serif text-h1-fluid font-semibold tracking-tight mb-10">
        More stories<span className="text-primary">.</span>
      </h2>
      <PostGrid posts={posts} />
    </section>
  );
}
