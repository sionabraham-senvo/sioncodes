import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import {getImagePath} from "@/lib/url";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (data.coverImage) {
    data.coverImage = getImagePath(data.coverImage);
  }

  if (data.thumbnailImage) {
    data.thumbnailImage = getImagePath(data.thumbnailImage);
  }

  if (data.author && data.author.picture) {
    data.author.picture = getImagePath(data.author.picture);
  }

  if (data.ogImage && data.ogImage.url) {
    data.ogImage.url = getImagePath(data.ogImage.url);
  }

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getPostsByTags(posts: Post[]): Record<string, Post[]> {
  const postsByTag: Record<string, Post[]> = {};

  posts.forEach(post => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = [];
        }
        postsByTag[tag].push(post);
      });
    } else {
      // Handle posts without tags
      if (!postsByTag['uncategorized']) {
        postsByTag['uncategorized'] = [];
      }
      postsByTag['uncategorized'].push(post);
    }
  });

  return postsByTag;
}