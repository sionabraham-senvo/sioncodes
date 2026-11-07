import Image from "next/image";

type Props = {
  title: string;
  src: string;
  /** Set for the above-the-fold image on a page so the browser fetches it first. */
  priority?: boolean;
  /** Fill a parent with a fixed aspect ratio, cropping the image to fit. */
  fill?: boolean;
};

const CoverImage = ({ title, src, priority = false, fill = false }: Props) => {
  // Drafts may not have a cover yet.
  if (!src) return null;

  if (fill) {
    return (
      <Image
        src={src}
        alt={`Cover Image for ${title}`}
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
      alt={`Cover Image for ${title}`}
      className="w-full h-auto block"
      width={1300}
      height={630}
      priority={priority}
    />
  );
};

export default CoverImage;
