import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags, tagSlug } from "@/lib/api";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    { url: SITE_URL, lastModified: posts[0]?.date },
    { url: `${SITE_URL}/writing`, lastModified: posts[0]?.date },
    { url: `${SITE_URL}/about` },
    ...posts.map((post) => ({
      url: `${SITE_URL}/posts/${post.slug}`,
      lastModified: post.date,
    })),
    ...getAllTags(posts).map((tag) => ({ url: `${SITE_URL}/tags/${tagSlug(tag)}` })),
  ];
}
