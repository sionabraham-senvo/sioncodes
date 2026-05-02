import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interfaces/post";

type Props = {
  posts: Post[];
  limit?: number;
};

export function SidebarLatestPosts({ posts, limit = 5 }: Props) {
  const latestPosts = posts.slice(0, limit);

  return (
    <div className="w-full rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-5">
        Latest articles
      </h2>
      <ul className="space-y-4">
        {latestPosts.map((post) => {
          const thumbnailSrc = post.thumbnailImage || post.coverImage || "";
          return (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="group flex items-center gap-3"
              >
                <div className="flex-shrink-0 overflow-hidden rounded-md border border-border">
                  <Image
                    src={thumbnailSrc}
                    alt={`Thumbnail for ${post.title}`}
                    width={56}
                    height={56}
                    className="object-cover w-14 h-14 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-medium leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
