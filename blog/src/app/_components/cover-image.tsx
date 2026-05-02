import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src }: Props) => {
  return (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className="w-full h-auto block"
      width={1300}
      height={630}
    />
  );
};

export default CoverImage;
