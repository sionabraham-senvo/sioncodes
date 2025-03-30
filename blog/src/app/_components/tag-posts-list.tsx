// blog/src/app/_components/tag-posts-list.tsx
import { Post } from "@/interfaces/post";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import {getImagePath} from "@/lib/url";

type Props = {
  posts: Post[];
  tag: string;
};

export function TagPostsList({ posts, tag }: Props) {
  return (
    <section>
      <div className="mb-8">
        <span className="inline-block bg-opacity-30 rounded-full px-3 py-1 text-sm font-semibold mr-2"
              style={{ backgroundColor: "var(--primary)", color: "var(--foreground)" }}>
          #{tag}
        </span>
        <span style={{ color: "var(--muted)" }}>{posts.length} posts</span>
      </div>

      <div className="space-y-12">
        {posts.map((post) => (
          <div key={post.slug}
               className="flex flex-col md:flex-row gap-6 p-4 rounded-lg"
               style={{ backgroundColor: "var(--background)", borderLeft: "4px solid var(--accent)" }}>
            <div className="md:w-1/3">
              <CoverImage slug={post.slug} title={post.title} src={getImagePath(post.coverImage)} />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-snug">
                <Link href={`/posts/${post.slug}`}
                      className="hover:underline"
                      style={{ color: "var(--secondary)" }}>
                  {post.title}
                </Link>
              </h3>
              <div className="text-sm mb-3" style={{ color: "var(--muted)" }}>
                <DateFormatter dateString={post.date} />
              </div>
              <p className="text-lg leading-relaxed mb-4" style={{ color: "var(--foreground)" }}>{post.excerpt}</p>
              <Link
                href={`/posts/${post.slug}`}
                className="hover:underline"
                style={{ color: "var(--accent)" }}
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}