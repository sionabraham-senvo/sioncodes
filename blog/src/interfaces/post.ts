import { type Author } from "./author";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  thumbnailImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  /** Estimated minutes to read, derived from the word count. */
  readingTime: number;
  /** Shown in `next dev`, left out of production builds. */
  draft?: boolean;
  tags?: string[];
};
