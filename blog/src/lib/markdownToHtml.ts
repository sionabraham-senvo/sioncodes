import type { Element, ElementContent, Root, RootContent } from "hast";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

/** A section heading in a post, used for the "On this page" list. */
export type Heading = {
  id: string;
  text: string;
};

const CALLOUT_VARIANTS: Record<string, string> = {
  Note: "callout-note",
  Tip: "callout-tip",
  Warning: "callout-warning",
};

/** Fence languages that get no label in the code block header. */
const UNLABELLED_LANGUAGES = new Set(["text", "txt", "plaintext"]);

const isElement = (node: ElementContent | RootContent): node is Element => node.type === "element";

const textContent = (node: ElementContent): string => {
  if (node.type === "text") return node.value;
  if (node.type === "element") return node.children.map(textContent).join("");
  return "";
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** Calls `visit` on every element below `node`, depth first. */
const walk = (node: Root | Element, visit: (element: Element, parent: Root | Element) => void) => {
  for (const child of [...node.children]) {
    if (!isElement(child)) continue;
    visit(child, node);
    walk(child, visit);
  }
};

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

  return (tree: Root) =>
    walk(tree, (element) => {
      if (element.tagName === "blockquote") markCallout(element);
    });
}

/**
 * Gives h2 and h3 headings a stable id, wraps their text in a link to themselves so a
 * section can be shared, and collects the h2s into `headings`.
 */
function rehypeHeadings({ headings }: { headings: Heading[] }) {
  return (tree: Root) => {
    const seen = new Map<string, number>();

    walk(tree, (element) => {
      if (element.tagName !== "h2" && element.tagName !== "h3") return;

      const text = element.children.map(textContent).join("").trim();
      const base = slugify(text) || "section";
      const count = seen.get(base) ?? 0;
      seen.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count}`;

      element.properties.id = id;
      element.children = [
        {
          type: "element",
          tagName: "a",
          properties: { href: `#${id}`, className: ["heading-anchor"] },
          children: element.children,
        },
      ];

      if (element.tagName === "h2") headings.push({ id, text });
    });
  };
}

/**
 * Wraps each code block in a figure with a header bar showing the language and a Copy
 * button. The button starts hidden; CodeBlockControls reveals and wires it up after load.
 */
function rehypeCodeBlocks() {
  return (tree: Root) =>
    walk(tree, (pre, parent) => {
      if (pre.tagName !== "pre") return;
      const code = pre.children.find(isElement);
      if (code?.tagName !== "code") return;

      const classes = Array.isArray(code.properties.className) ? code.properties.className : [];
      const language = classes
        .map(String)
        .find((name) => name.startsWith("language-"))
        ?.slice("language-".length);
      const label = language && !UNLABELLED_LANGUAGES.has(language) ? language : "";

      const figure: Element = {
        type: "element",
        tagName: "figure",
        properties: { className: ["code-block"] },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { className: ["code-block-bar"] },
            children: [
              {
                type: "element",
                tagName: "span",
                properties: { className: ["code-block-lang"] },
                children: label ? [{ type: "text", value: label }] : [],
              },
              {
                type: "element",
                tagName: "button",
                properties: { type: "button", className: ["code-block-copy"], dataCopyCode: "", hidden: true },
                children: [{ type: "text", value: "Copy" }],
              },
            ],
          },
          {
            type: "element",
            tagName: "div",
            properties: { className: ["code-block-body"] },
            children: [pre],
          },
        ],
      };

      parent.children[parent.children.indexOf(pre)] = figure;
    });
}

export default async function markdownToHtml(markdown: string): Promise<{ html: string; headings: Heading[] }> {
  const headings: Heading[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeCallouts)
    .use(rehypeHeadings, { headings })
    .use(rehypeHighlight, { plainText: ["text", "txt"] })
    .use(rehypeCodeBlocks)
    .use(rehypeStringify)
    .process(markdown);
  return { html: String(file), headings };
}
