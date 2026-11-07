import StickyNav from "./sticky-nav";
import { getAllTags, tagSlug } from "@/lib/api";

type Props = {
  showBrand?: boolean;
  condenseOnScroll?: boolean;
  brandText?: string;
  condensedBrandText?: string;
};

const Header = ({
  showBrand = true,
  condenseOnScroll = false,
  brandText,
  condensedBrandText,
}: Props) => {
  const tagLinks = getAllTags().map((tag) => ({ label: tag, href: `/tags/${tagSlug(tag)}` }));

  return (
    <StickyNav
      tagLinks={tagLinks}
      showBrand={showBrand}
      condenseOnScroll={condenseOnScroll}
      brandText={brandText}
      condensedBrandText={condensedBrandText}
    />
  );
};

export default Header;
