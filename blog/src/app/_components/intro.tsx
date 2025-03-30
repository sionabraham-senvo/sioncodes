import MenuBar from "@/app/_components/menu-bar";
import { getAllPosts, getPostsByTags } from "@/lib/api";

export function Intro() {
  const posts = getAllPosts();
  const postsByTags = getPostsByTags(posts);
  const tags = Object.keys(postsByTags).filter(tag => tag !== 'uncategorized');
  const menuItems = ['Home', ...tags, 'About'];

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        SionCodes.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        <MenuBar items={menuItems} />
        A blog about web development, software, and programming. <br />
      </h4>
    </section>
  );
}