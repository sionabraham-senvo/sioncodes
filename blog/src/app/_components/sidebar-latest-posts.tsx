// src/app/_components/sidebar-latest-posts.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/interfaces/post';

type Props = {
  posts: Post[];
  limit?: number;
};

export function SidebarLatestPosts({ posts, limit = 5 }: Props) {
  const latestPosts = posts.slice(0, limit);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 tracking-tight">Latest Articles</h2>
      <div className="space-y-4">
        {latestPosts.map((post) => {
          const thumbnailSrc = post.thumbnailImage || post.coverImage || '';

          return (
            <Link
              href={`/posts/${post.slug}`}
              key={post.slug}
              className="flex items-start gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex-shrink-0">
                <Image
                  src={thumbnailSrc}
                  alt={`Thumbnail for ${post.title}`}
                  width={50}
                  height={50}
                  className="object-cover rounded"
                />
              </div>
              <h3 className="text-sm font-medium break-words">{post.title}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}