import type { Element, ElementContent, Root } from "hast";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const CALLOUT_VARIANTS: Record<string, string> = {
  Note: "callout-note",
  Tip: "callout-tip",
  Warning: "callout-warning",
};

const isElement = (node: ElementContent): node is Element => node.type === "element";

/**
 * Turns blockquotes that open with `**Note**`, `**Tip**` or `**Warning**` into callouts.
 * Styles live in markdown-styles.module.css.
 */
function rehypeCallouts() {
  const markCallout = (blockquote: Element) => {
    const firstParagraph = blockquote.children.find(isElement);
    if (firstParagraph?.tagName !== "p") return;

    const strong = firstParagraph.children.find(
      (child): child is Element => isElement(child) && child.tagName === "strong",
    );
    const label = strong?.children[0]?.type === "text" ? strong.children[0].value : "";
    const variant = CALLOUT_VARIANTS[label];
    if (!variant) return;

    blockquote.properties.className = ["callout", variant];
    firstParagraph.properties.className = ["callout-heading"];
  };

  const walk = (node: Root | Element) => {
    for (const child of node.children) {
      if (child.type !== "element") continue;
      if (child.tagName === "blockquote") markCallout(child);
      walk(child);
    }
  };

  return (tree: Root) => walk(tree);
}

export default async function markdownToHtml(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeCallouts)
    .use(rehypeHighlight, { plainText: ["text", "txt"] })
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}
