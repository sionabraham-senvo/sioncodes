import StickyNav from "./sticky-nav";

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
  return (
    <StickyNav
      showBrand={showBrand}
      condenseOnScroll={condenseOnScroll}
      brandText={brandText}
      condensedBrandText={condensedBrandText}
    />
  );
};

export default Header;
