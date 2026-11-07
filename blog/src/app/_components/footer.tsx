import { SITE_NAME, SOCIAL_LINKS } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          Made with <span className="text-primary">♥</span> in Berlin
        </p>
        <nav aria-label="Elsewhere">
          <ul className="flex items-center gap-5">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/feed.xml" className="hover:text-primary transition-colors">
                RSS
              </a>
            </li>
          </ul>
        </nav>
        <p>
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
