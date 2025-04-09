import cn from "classnames";

type Props = {
  preview?: boolean;
  text?: string;
  link?: {
    url: string;
    text: string;
  };
  children?: React.ReactNode;
};

const Alert = ({ preview, text, link, children }: Props) => {
  // Don't render if there's no content
  if (!text && !children) {
    return null;
  }

  return (
    <div
      className={cn("border-b border-transparent", {
        "bg-[#0057B7] text-white": preview,
        "bg-[#0057B7] text-white": !preview,
      })}
      style={{ borderColor: 'var(--border-color)' }}
    >
      <div className="container mx-auto py-2 px-4 text-center">
        {text || children}
        {link && (
          <>
            {" "}
            <a
              href={link.url}
              className="underline font-semibold hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.text}
            </a>
            {" Героям слава!"}
          </>
        )}
      </div>
    </div>
  );
};

export default Alert;