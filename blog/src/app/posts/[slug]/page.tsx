import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import { SidebarLatestPosts } from "@/app/_components/sidebar-latest-posts";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  const allPosts = getAllPosts();
  const latestPosts = allPosts.filter((p) => p.slug !== post.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="pt-8 md:pt-12" />
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            excerpt={post.excerpt}
            tags={post.tags}
          />
          <div className="flex flex-col lg:flex-row lg:gap-12 mb-24">
            <div className="lg:w-3/4">
              <PostBody content={content} />
            </div>
            <aside className="lg:w-1/4 mt-12 lg:mt-0 lg:sticky lg:top-24 self-start z-0">
              <SidebarLatestPosts posts={latestPosts} />
            </aside>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | SiônCodes.`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
