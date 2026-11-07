import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");
const WORDS_PER_MINUTE = 230;

/** Drafts (`draft: true` in frontmatter) show up in `next dev` but never in a production build. */
const includeDrafts = process.env.NODE_ENV !== "production";

function withLeadingSlash(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  if (data.draft && !includeDrafts) return null;

  // Excerpts wrapped over several lines in the frontmatter come through with doubled spaces.
  if (typeof data.excerpt === "string") {
    data.excerpt = data.excerpt.replace(/\s+/g, " ").trim();
  }

  if (data.coverImage) {
    data.coverImage = withLeadingSlash(data.coverImage);
  }

  if (data.thumbnailImage) {
    data.thumbnailImage = withLeadingSlash(data.thumbnailImage);
  }

  if (data.author?.picture) {
    data.author.picture = withLeadingSlash(data.author.picture);
  }

  if (data.ogImage?.url) {
    data.ogImage.url = withLeadingSlash(data.ogImage.url);
  }

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

  return { ...data, slug, content, readingTime } as Post;
}

/** All published posts, newest first. */
export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

/** URL segment for a tag, e.g. "PostgreSQL" -> "postgresql". */
export function tagSlug(tag: string) {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

/** Unique tags across posts, keeping each tag's original spelling (e.g. "PostgreSQL"). */
export function getAllTags(posts: Post[] = getAllPosts()): string[] {
  const tags = new Map<string, string>();
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      const slug = tagSlug(tag);
      if (!tags.has(slug)) tags.set(slug, tag);
    }
  }
  return Array.from(tags.values());
}
