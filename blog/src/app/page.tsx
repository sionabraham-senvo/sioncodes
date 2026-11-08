import type { Metadata } from "next";
import Container from "@/app/_components/container";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Index() {
  const allPosts = getAllPosts();
  const [heroPost, ...morePosts] = allPosts;

  return (
    <>
      <Header condenseOnScroll />
      <main>
        <Container>
          <h1 className="sr-only">
            {SITE_NAME} {SITE_DESCRIPTION}
          </h1>
          <div className="pt-8 md:pt-12" />
          {heroPost ? (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.ogImage.url}
              date={heroPost.date}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              readingTime={heroPost.readingTime}
              tags={heroPost.tags}
              verticalLabel={SITE_NAME}
              verticalLabelId="site-hero-mark"
            />
          ) : (
            <p className="text-lg text-muted-foreground py-8">No posts yet. Check back soon.</p>
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </main>
      <Footer />
    </>
  );
}
