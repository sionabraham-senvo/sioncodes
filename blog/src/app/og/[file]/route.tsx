import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * Link-preview cards, built as PNG files at export time: /og/site.png for the site itself
 * and /og/<slug>.png for each post. A post with its own wide cover uses that instead (see
 * generateMetadata in posts/[slug]/page.tsx); these are for posts without one.
 */
export const dynamic = "force-static";
export const dynamicParams = false;

const SITE_CARD = "site";
const SIZE = { width: 1200, height: 630 };

// The light-theme colours from globals.css. Link previews don't follow the reader's theme.
const PAPER = "#f6f7f3";
const INK = "#14201a";
const GREEN = "#125e3b";
const RED = "#d4202c";

export function generateStaticParams() {
  return [SITE_CARD, ...getAllPosts().map((post) => post.slug)].map((name) => ({ file: `${name}.png` }));
}

/**
 * The site's heading face, fetched from Google Fonts as a TTF (the format ImageResponse
 * needs). If the fetch fails the card falls back to the built-in sans rather than failing
 * the build.
 */
async function loadSerif(): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch("https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@600")).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

/** Long titles step down in size so they stay within three or four lines. */
function titleSize(title: string) {
  if (title.length <= 36) return 92;
  if (title.length <= 64) return 76;
  return 62;
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const name = file.replace(/\.png$/, "");
  const post = name === SITE_CARD ? null : getPostBySlug(name);
  if (name !== SITE_CARD && !post) return new Response("Not found", { status: 404 });

  const serif = await loadSerif();
  const wordmark = SITE_NAME.replace(/\.$/, "");
  const host = new URL(SITE_URL).host;

  return new ImageResponse(
    (
      // White above, green below, one red mark: the same idea as the site's palette.
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: PAPER,
          fontFamily: serif ? "Source Serif 4" : undefined,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: post ? 150 : 315,
            padding: "0 72px",
            color: INK,
          }}
        >
          <div style={{ display: "flex", fontSize: post ? 52 : 150, letterSpacing: "-0.03em" }}>
            {wordmark}
            <span style={{ color: RED }}>.</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: post ? "flex-end" : "center",
            padding: post ? "0 72px 64px" : "0 72px",
            backgroundColor: GREEN,
            color: PAPER,
          }}
        >
          {post ? (
            <div
              style={{
                display: "flex",
                fontSize: titleSize(post.title),
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
              }}
            >
              {post.title}
            </div>
          ) : (
            <div style={{ display: "flex", fontSize: 44 }}>{host}</div>
          )}
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: serif ? [{ name: "Source Serif 4", data: serif, weight: 600, style: "normal" }] : undefined,
    },
  );
}
