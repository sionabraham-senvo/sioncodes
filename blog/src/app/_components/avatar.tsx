import Image from "next/image";

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={picture}
        alt={name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full ring-2 ring-border object-cover"
      />
      <div className="text-sm font-medium text-foreground">{name}</div>
    </div>
  );
};

export default Avatar;
