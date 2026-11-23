export const SITE_URL = "https://sioncodes.com";
export const SITE_NAME = "SiônCodes.";
export const SITE_DESCRIPTION = "A blog about web development, software, and programming.";
export const SITE_LOCALE = "en_GB";
export const DEFAULT_OG_IMAGE = "/assets/blog/documenting-with-tests/cover_big.webp";

/** Page background colours from globals.css, used for the browser's theme-color. */
export const THEME_COLORS = { light: "#f6f7f3", dark: "#0f1512" } as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/sionabraham-senvo" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sionabraham/" },
] as const;

export const AUTHOR_NAME = "Siôn Abraham";

export const REPO_URL = "https://github.com/sionabraham-senvo/sioncodes";

/** Covers the text of the posts. Code is MIT (LICENSE in the repo); images are not licensed for reuse. */
export const CONTENT_LICENSE = {
  name: "CC BY-NC 4.0",
  url: "https://creativecommons.org/licenses/by-nc/4.0/",
} as const;

export const EMAIL = "sionabraham95@gmail.com";

/** Follows "Written by Siôn Abraham," at the end of each post. */
export const AUTHOR_BIO = "a backend engineer in Berlin who works with Python, PostgreSQL and FastAPI.";
