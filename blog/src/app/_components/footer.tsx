import Link from "next/link";
import { CONTENT_LICENSE, EMAIL, REPO_URL, SITE_NAME, SOCIAL_LINKS } from "@/lib/site";

const siteLinks = [
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/about" },
  { label: "RSS feed", href: "/feed.xml" },
];

const elsewhereLinks = [...SOCIAL_LINKS, { label: "Email", href: `mailto:${EMAIL}` }];

const linkClass = "text-foreground hover:text-primary transition-colors";
const smallPrintLinkClass = "underline underline-offset-2 hover:text-primary transition-colors";

/** One titled list of links. `plain` links (feeds, mailto, other sites) skip the client router. */
function LinkGroup({
  title,
  links,
  plain = false,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
  plain?: boolean;
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm text-muted-foreground mb-3">{title}</h2>
      <ul className="space-y-2">
        {links.map((link) => {
          const external = link.href.startsWith("http");
          // The feed is a file, not a page, so it also gets a plain anchor.
          const usePlainAnchor = plain || link.href.endsWith(".xml");
          return (
            <li key={link.href}>
              {usePlainAnchor ? (
                <a
                  href={link.href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className={linkClass}
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** The site signs off with its wordmark at display size, links beside it and the small print underneath. */
export function Footer() {
  const dotted = SITE_NAME.endsWith(".");
  const wordmark = dotted ? SITE_NAME.slice(0, -1) : SITE_NAME;

  return (
    <footer className="mt-24 border-t border-border">
      <div className="container mx-auto px-5 pt-12 md:pt-16 pb-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Link
            href="/"
            aria-label="SiônCodes home"
            className="font-serif font-semibold leading-[0.85] tracking-tighter text-[clamp(3.25rem,12vw,8.5rem)] hover:text-primary transition-colors"
          >
            {wordmark}
            {dotted && <span className="text-brand">.</span>}
          </Link>
          <div className="flex gap-14 sm:gap-20 md:pb-2">
            <LinkGroup title="Read" links={siteLinks} />
            <LinkGroup title="Elsewhere" links={elsewhereLinks} plain />
          </div>
        </div>

        <div className="mt-10 md:mt-14 pt-6 border-t border-border flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between text-sm text-muted-foreground">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} {SITE_NAME} Made with <span className="text-brand">♥</span> in Berlin
            </p>
            <p>
              Text is licensed{" "}
              <a href={CONTENT_LICENSE.url} rel="license noopener noreferrer" target="_blank" className={smallPrintLinkClass}>
                {CONTENT_LICENSE.name}
              </a>
              , code is{" "}
              <a href={`${REPO_URL}/blob/main/LICENSE`} rel="noopener noreferrer" target="_blank" className={smallPrintLinkClass}>
                MIT
              </a>
              .
            </p>
          </div>
          <a href="#top" className="hover:text-primary transition-colors">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
