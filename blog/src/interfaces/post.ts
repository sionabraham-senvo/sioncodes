import { type Author } from "./author";

/** How a cover sits in a fixed-ratio frame: cropped to fill it, or shown whole. */
export type CoverFit = "cover" | "contain";

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
  /** Set to "contain" when cropping would cut something that matters, such as a caption. */
  coverFit?: CoverFit;
  content: string;
  /** Estimated minutes to read, derived from the word count. */
  readingTime: number;
  /** Shown in `next dev`, left out of production builds. */
  draft?: boolean;
  tags?: string[];
};
