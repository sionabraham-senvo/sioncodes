type Props = {
  /** A schema.org object, e.g. a BlogPosting. */
  data: Record<string, unknown>;
};

/** Structured data for search engines. "<" is escaped so post text can't close the script tag. */
export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
