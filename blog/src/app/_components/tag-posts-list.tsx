import { Post } from "@/interfaces/post";
import { PostGrid } from "./post-grid";

type Props = {
  posts: Post[];
};

export function TagPostsList({ posts }: Props) {
  return (
    <section className="mb-24">
      <PostGrid posts={posts} />
    </section>
  );
}
