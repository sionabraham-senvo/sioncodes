import Image from "next/image";
import cn from "classnames";
import { type CoverFit } from "@/interfaces/post";

// Covers always sit next to the post title, so they are decorative (alt="") and screen
// readers don't hear the title twice.
type Props = {
  src: string;
  /** Set for the above-the-fold image on a page so the browser fetches it first. */
  priority?: boolean;
  /** Fill a parent with a fixed aspect ratio, cropping the image to fit. */
  fill?: boolean;
  /**
   * With `fill`: "cover" (default) crops the image to the frame; "contain" shows all of it
   * over a blurred copy of itself, for covers that lose their point when cropped.
   */
  fit?: CoverFit;
  /** With `fit="contain"`: extra classes for the uncropped image, e.g. padding to keep it clear of an overlay. */
  className?: string;
};

const CoverImage = ({ src, priority = false, fill = false, fit = "cover", className }: Props) => {
  // Drafts may not have a cover yet.
  if (!src) return null;

  if (fill && fit === "contain") {
    return (
      <>
        <Image
          src={src}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover scale-125 blur-2xl brightness-75"
        />
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          priority={priority}
          className={cn("object-contain", className)}
        />
      </>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt=""
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover"
      />
    );
  }

  return (
    <Image
      src={src}
      alt=""
      className="w-full h-auto block"
      width={1300}
      height={630}
      priority={priority}
    />
  );
};

export default CoverImage;
