import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  excerpt: string;
  tags?: string[];
};

export function PostHeader({ title, coverImage, date, author, excerpt, tags }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-8 md:mb-16">
      {/* Cover image on the left */}
      <div className="md:w-1/2">
        <CoverImage title={title} src={coverImage} />
      </div>

      {/* Title and avatar on the right */}
      <div className="md:w-1/2 flex flex-col">
        {tags && tags.length > 0 && (
          <div className="text-xs text-gray-500 mb-2 font-bold uppercase">
            {tags.join("   /   ")}
          </div>
        )}
        <PostTitle>{title}</PostTitle>
        <p className="text-lg leading-relaxed mb-4 text-gray-600">{excerpt}</p>
        <div className="mt-4">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mt-2">
          <DateFormatter dateString={date} includeTimezone={true} />
        </div>
      </div>
    </div>
  );
}