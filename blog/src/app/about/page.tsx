import Container from "@/app/_components/container";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllTags, tagSlug } from "@/lib/api";
import { EMAIL, SOCIAL_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Siôn Abraham is a backend engineer writing about Python, PostgreSQL, FastAPI and building better software.",
  alternates: { canonical: "/about" },
};

const connectLinks = [...SOCIAL_LINKS, { label: "Email", href: `mailto:${EMAIL}` }];
const linkedIn = SOCIAL_LINKS.find((link) => link.label === "LinkedIn");

const skills = [
  "Python", "PostgreSQL", "MongoDB", "DocumentDB", "SQLAlchemy", "FastAPI", "Docker", "Kubernetes", "S3", "RDS", "Sentry", "AWS", "Hetzner"
];

const skillClass =
  "inline-flex items-center px-3 py-1 rounded-full border border-border bg-card text-sm text-foreground";

export default function AboutPage() {
  // Skills that are also tags link to their posts.
  const tagSlugs = new Set(getAllTags().map(tagSlug));

  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="max-w-5xl mx-auto py-8 md:py-12">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">About</p>
            <h1 className="font-serif text-display font-semibold tracking-tighter mb-12">
              Hello, I&apos;m Siôn<span className="text-primary">.</span>
            </h1>

            <div className="grid lg:grid-cols-3 gap-10 items-start">
              <aside className="lg:col-span-1">
                <div className="rounded-2xl overflow-hidden border border-border shadow-sm mb-6">
                  <Image
                    src="/assets/blog/authors/sion_big.webp"
                    alt="Siôn Abraham"
                    width={500}
                    height={500}
                    className="object-cover w-full h-auto"
                  />
                </div>

                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    Connect
                  </h2>
                  <ul className="space-y-2">
                    {connectLinks.map((link) => {
                      const isExternal = link.href.startsWith("http");
                      return (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                            className="flex items-center justify-between text-sm font-medium text-foreground hover:text-primary transition-colors group"
                          >
                            <span>{link.label}</span>
                            <span aria-hidden className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                              →
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>

              <article className="lg:col-span-2 space-y-8">
                <div className="font-serif text-lg md:text-xl leading-relaxed text-foreground space-y-5">
                  <p>
                    I&apos;m a software engineer with a decade of experience building scalable applications,
                    specializing in backend development with Python, PostgreSQL, and FastAPI.
                  </p>
                  <blockquote className="border-l-4 border-primary pl-5 italic text-muted-foreground">
                    Great software isn&apos;t just about code, it&apos;s about creating elegant
                    solutions to complex problems.
                  </blockquote>
                  <p>
                    My work centers on clean architecture, design patterns, and performance.
                    I enjoy challenges from RESTful API design to efficient database solutions
                    with PostgreSQL and SQLAlchemy.
                  </p>
                  <p>
                    This blog is where I share insights, tutorials, and lessons from the trenches.
                    I aim to demystify complex topics and help developers build better software, one post at a time.
                  </p>
                  <p>
                    Off-screen, you&apos;ll find me with my family, drinking coffee, or exploring the outdoors. Talk
                    to me about books, games, and software!
                  </p>
                </div>

                <div className="pt-8 border-t border-border">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    Skills &amp; expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) =>
                      tagSlugs.has(tagSlug(skill)) ? (
                        <Link
                          key={skill}
                          href={`/tags/${tagSlug(skill)}`}
                          className={`${skillClass} hover:border-primary hover:text-primary transition-colors`}
                        >
                          {skill}
                          <span aria-hidden className="ml-1.5 text-muted-foreground">
                            →
                          </span>
                        </Link>
                      ) : (
                        <span key={skill} className={skillClass}>
                          {skill}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="pt-8 border-t border-border">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                    Business inquiries
                  </h3>
                  <p className="text-base text-foreground/90">
                    For consulting, freelance work or collaborations, message me on{" "}
                    <a
                      href={linkedIn?.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:opacity-80"
                    >
                      LinkedIn
                    </a>
                    . I&apos;m always open to new opportunities and connections in the software development world.
                  </p>
                </div>
                <div className="pt-8 border-t border-border">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                    Disclaimer
                  </h3>
                  <p className="text-base text-foreground/90">
                    The views expressed on this blog are my own and do not necessarily reflect the views of any
                    employer or organization I am affiliated with. This website was generated partially using AI tools,
                    and the posts reflect my personal insights and experiences in software development. I&apos;m
                    crappy with grammar and spelling, so I do use AI and spellcheckers to help with that.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
