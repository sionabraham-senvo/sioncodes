import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { DEFAULT_OG_IMAGE, SITE_LOCALE, SITE_NAME } from "@/lib/site";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { SidebarLatestPosts } from "@/app/_components/sidebar-latest-posts";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

// Only the posts returned by generateStaticParams exist; anything else is a 404.
export const dynamicParams = false;

export default async function Post(props: Params) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const latestPosts = getAllPosts().filter((p) => p.slug !== post.slug);
  const content = await markdownToHtml(post.content || "");

  return (
    <>
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
              </div>
              <aside className="lg:w-64 shrink-0 mt-12 lg:mt-0 lg:sticky lg:top-24 self-start z-0">
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
