import fs from "fs";
import path from "path";
import { getImageProps, type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  /** Path under `public/`, e.g. "/assets/blog/authors/sion_small.jpg". */
  src: string;
};

const jxlSiblings = new Map<string, string | null>();

/** The `.jxl` file saved next to an image in `public/`, if there is one. Checked at build time. */
function jxlSibling(src: string): string | null {
  let sibling = jxlSiblings.get(src);
  if (sibling === undefined) {
    const candidate = src.replace(/\.[a-z0-9]+$/i, ".jxl");
    const exists = candidate !== src && fs.existsSync(path.join(process.cwd(), "public", candidate));
    sibling = exists ? candidate : null;
    jxlSiblings.set(src, sibling);
  }
  return sibling;
}

/**
 * `next/image`, but offering a JPEG XL copy first to browsers that can decode it. Both the
 * JPEG XL and the JPEG it falls back to are saved progressively, so on a slow connection the
 * whole picture shows early and sharpens, instead of arriving top to bottom.
 *
 * Takes the same props as `Image`. To add an image, save `name.jpg` and `name.jxl` side by
 * side and point `src` at the `.jpg`.
 */
export default function Picture({ src, alt, ...props }: Props) {
  const { props: img } = getImageProps({ src, alt, ...props });
  const jxl = jxlSibling(src);

  return (
    // `contents` keeps the <img> laid out as if the <picture> wrapper wasn't there.
    <picture className="contents">
      {jxl && <source srcSet={jxl} type="image/jxl" />}
      {/* A <picture> can't be preloaded without knowing which file wins, so priority images ask for an early fetch instead. */}
      <img {...img} alt={alt} fetchPriority={props.priority ? "high" : img.fetchPriority} />
    </picture>
  );
}
