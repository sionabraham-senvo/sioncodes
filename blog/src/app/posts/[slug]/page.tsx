import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { DEFAULT_OG_IMAGE, SITE_LOCALE, SITE_NAME } from "@/lib/site";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import { PostBody } from "@/app/_components/post-body";
import { PostEnd } from "@/app/_components/post-end";
import { PostHeader } from "@/app/_components/post-header";
import { SidebarLatestPosts } from "@/app/_components/sidebar-latest-posts";
import { TableOfContents } from "@/app/_components/table-of-contents";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

// Only the posts returned by generateStaticParams exist; anything else is a 404.
export const dynamicParams = false;

/** Posts with fewer sections than this don't get an "On this page" list. */
const MIN_HEADINGS_FOR_CONTENTS = 3;

export default async function Post(props: Params) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const latestPosts = allPosts.filter((p) => p.slug !== post.slug);
  // Suggest the next older post; from the oldest post, wrap round to the newest.
  const index = allPosts.findIndex((p) => p.slug === post.slug);
  const nextPost = allPosts[index + 1] ?? latestPosts[0] ?? null;
  const { html: content, headings } = await markdownToHtml(post.content || "");
  const showContents = headings.length >= MIN_HEADINGS_FOR_CONTENTS;

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <main>
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="pt-8 md:pt-12" />
            <PostHeader
              title={post.title}
              // The wide 3:2 cover crops better into the banner than the square one.
              coverImage={post.ogImage?.url || post.coverImage}
              date={post.date}
              readingTime={post.readingTime}
              author={post.author}
              excerpt={post.excerpt}
              tags={post.tags}
            />
            {/* Text column capped near 70 characters per line; sidebar keeps a fixed width. */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-16 mb-24">
              <div className="min-w-0 flex-1 lg:max-w-[42rem]">
                <PostBody content={content} />
                <PostEnd author={post.author} next={nextPost} />
              </div>
              {/* Scrolls on its own if the contents list and latest posts are taller than the window. */}
              <aside className="lg:w-64 shrink-0 mt-12 lg:mt-0 lg:sticky lg:top-24 self-start z-0 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto space-y-6">
                {showContents && (
                  <div className="hidden lg:block">
                    <TableOfContents headings={headings} />
                  </div>
                )}
                <SidebarLatestPosts posts={latestPosts} />
              </aside>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export async function generateMetadata(props: Params): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `/posts/${post.slug}`;
  const image = post.ogImage?.url || DEFAULT_OG_IMAGE;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}
