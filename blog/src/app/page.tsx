import Container from "@/app/_components/container";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <Header condenseOnScroll />
      <main>
        <Container>
          <div className="pt-8 md:pt-12" />
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.ogImage.url}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
            verticalLabel="SiônCodes."
            verticalLabelId="site-hero-mark"
          />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </main>
      <Footer />
    </>
  );
}
