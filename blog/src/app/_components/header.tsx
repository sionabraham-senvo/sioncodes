import StickyNav from "./sticky-nav";
import { getAllPosts, getPostsByTags } from "@/lib/api";

type Props = {
  showBrand?: boolean;
  condenseOnScroll?: boolean;
};

const Header = ({ showBrand = true, condenseOnScroll = false }: Props) => {
  const posts = getAllPosts();
  const postsByTags = getPostsByTags(posts);
  const tags = Object.keys(postsByTags).filter((tag) => tag !== "uncategorized");
  const menuItems = ["Home", ...tags, "About"];

  return (
    <StickyNav
      menuItems={menuItems}
      showBrand={showBrand}
      condenseOnScroll={condenseOnScroll}
    />
  );
};

export default Header;
