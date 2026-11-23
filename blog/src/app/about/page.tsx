import Container from "@/app/_components/container";
import DateFormatter from "@/app/_components/date-formatter";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import { JsonLd } from "@/app/_components/json-ld";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getAllTags, tagSlug } from "@/lib/api";
import { AUTHOR_NAME, EMAIL, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Siôn Abraham is a backend engineer in Berlin writing about Python, PostgreSQL, API design and building better software.",
  alternates: { canonical: "/about" },
};

const linkedIn = SOCIAL_LINKS.find((link) => link.label === "LinkedIn");
const gitHub = SOCIAL_LINKS.find((link) => link.label === "GitHub");

/** Everyday tools first, then the ones around them. Any that are also a tag link to their posts. */
const mainTools = ["Python", "PostgreSQL", "SQLAlchemy", "FastAPI"];
const otherTools = ["Docker", "Kubernetes", "AWS (S3, RDS, DocumentDB)", "Hetzner", "MongoDB", "Sentry"];

/** How many recent posts the Writing row lists before pointing to the full list. */
const RECENT_POSTS = 3;

const linkClass =
  "text-primary underline underline-offset-[3px] decoration-primary/40 hover:decoration-primary transition-colors";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {children}
    </a>
  );
}

/** One line of the page: a short heading in the left column, prose on the right. Stacks on phones. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-x-10 gap-y-3 border-t border-border py-8 md:py-10 sm:grid-cols-[9rem_minmax(0,1fr)]">
      <h2 className="text-sm font-medium text-muted-foreground sm:pt-1.5">{label}</h2>
      <div className="space-y-4 font-serif text-lg leading-relaxed text-foreground/90">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  const posts = getAllPosts();
  const tagSlugs = new Set(getAllTags(posts).map(tagSlug));

  /** "Python, PostgreSQL and FastAPI", with each tool that is also a tag linked to its posts. */
  const toolList = (tools: string[]) =>
    tools.map((tool, index) => (
      <span key={tool}>
        {index > 0 && (index === tools.length - 1 ? " and " : ", ")}
        {tagSlugs.has(tagSlug(tool)) ? (
          <Link href={`/tags/${tagSlug(tool)}`} className={linkClass}>
            {tool}
          </Link>
        ) : (
          tool
        )}
      </span>
    ));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: AUTHOR_NAME,
          url: `${SITE_URL}/about`,
          image: `${SITE_URL}/assets/blog/authors/sion_big.webp`,
          sameAs: SOCIAL_LINKS.map((link) => link.href),
        }}
      />
      <Header />
      <main>
        <Container>
          <div className="max-w-4xl mx-auto py-8 md:py-12">
            {/*
              Phones: greeting with a small portrait beside it, introduction underneath.
              From md up: a larger portrait beside both, with the text sitting on its bottom edge.
            */}
            <div className="grid grid-cols-[minmax(0,1fr)_auto] md:grid-rows-[1fr_auto] items-end gap-x-6 md:gap-x-12 mb-12 md:mb-16">
              <div className="min-w-0">
                <h1 className="font-serif text-display font-semibold tracking-tighter">
                  Hello, I&apos;m Siôn<span className="text-brand">.</span>
                </h1>
                <p className="mt-3 text-sm text-muted-foreground">Said like &ldquo;Shawn&rdquo;.</p>
              </div>
              <div className="w-20 sm:w-28 md:w-60 md:row-span-2 overflow-hidden rounded-xl md:rounded-2xl border border-border shadow-sm">
                <Image
                  src="/assets/blog/authors/sion_big.webp"
                  alt="Illustration of Siôn sitting outside a café"
                  width={1024}
                  height={1536}
                  priority
                  className="block w-full h-auto"
                />
              </div>
              <p className="col-span-2 md:col-span-1 mt-8 font-serif text-2xl md:text-[1.75rem] leading-snug tracking-tight text-foreground">
                I&apos;m a backend engineer in Berlin. For about a decade I&apos;ve built the parts of software
                nobody sees: the APIs, the databases and the plumbing between them.
              </p>
            </div>

            <Row label="Work">
              <p>
                I work at <ExternalLink href="https://www.senvo.ai/">Senvo</ExternalLink>, where we audit parcel
                carrier invoices and recover overcharges and refunds for shippers. My part is the plumbing: turning
                inconsistent tracking data from hundreds of carriers into shipment records you can rely on.
              </p>
              <p>
                What I care about is clean architecture, sensible design patterns and software that stays fast,
                whether that&apos;s the shape of an API or the way a database is put to work.
              </p>
            </Row>

            <Row label="Writing">
              <p>
                This blog is where I write up what the work teaches me: lessons from the trenches, the odd tutorial,
                and opinions I&apos;ve usually earned the hard way.
              </p>
              {posts.length > 0 && (
                <ul>
                  {posts.slice(0, RECENT_POSTS).map((post) => (
                    <li key={post.slug} className="border-t border-border first:border-t-0">
                      <Link href={`/posts/${post.slug}`} className="group block py-3">
                        <span className="block font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors">
                          {post.title}
                        </span>
                        <span className="mt-1 block font-sans text-sm text-muted-foreground tabular-nums">
                          <DateFormatter dateString={post.date} />, {post.readingTime} min read
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {posts.length > RECENT_POSTS && (
                <p>
                  <Link href="/writing" className={linkClass}>
                    Everything I&apos;ve written
                  </Link>
                </p>
              )}
            </Row>

            <Row label="Tools">
              <p>
                Most days it&apos;s {toolList(mainTools)}. Around them: {toolList(otherTools)}.
              </p>
            </Row>

            <Row label="Away from the keyboard">
              <p>
                You&apos;ll find me with my family, drinking coffee, or somewhere outdoors. Talk to me about books,
                games and software.
              </p>
            </Row>

            <Row label="Get in touch">
              <p>
                <a href={`mailto:${EMAIL}`} className={linkClass}>
                  Email me
                </a>{" "}
                about anything you&apos;ve read here.
                {linkedIn && (
                  <>
                    {" "}
                    For consulting, freelance work or collaborations, message me on{" "}
                    <ExternalLink href={linkedIn.href}>LinkedIn</ExternalLink>.
                  </>
                )}
                {gitHub && (
                  <>
                    {" "}
                    The code from my posts is on <ExternalLink href={gitHub.href}>GitHub</ExternalLink>.
                  </>
                )}
              </p>
            </Row>

            <Row label="Small print">
              <p className="font-sans text-base text-muted-foreground">
                The views here are my own and not those of any employer or organisation I&apos;m affiliated with.
                This website was built partly with AI tools. The posts are my own insights and experience, but
                I&apos;m crappy with grammar and spelling, so I use AI and spellcheckers to help with that.
              </p>
            </Row>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
