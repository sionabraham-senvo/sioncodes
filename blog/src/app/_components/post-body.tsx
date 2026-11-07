import "highlight.js/styles/atom-one-dark.css";
import styles from "./markdown-styles.module.css";

type Props = {
  /** HTML from markdownToHtml: syntax highlighting and callouts are already applied at build time. */
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <article
      className={`${styles.markdown} prose prose-lg max-w-none font-serif
        prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-foreground
        prose-p:text-foreground/90 prose-p:leading-relaxed
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground
        prose-blockquote:border-primary prose-blockquote:text-muted-foreground
        prose-code:font-mono prose-code:text-[0.95em] prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
        prose-pre:rounded-xl prose-pre:border prose-pre:border-border
        prose-img:rounded-xl prose-img:shadow-md
        prose-hr:border-border
        dark:prose-invert`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
