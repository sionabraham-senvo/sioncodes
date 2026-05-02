import Container from "@/app/_components/container";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import Image from "next/image";
import Link from "next/link";
import { getImagePath } from "@/lib/url";

const skills = [
  "Python", "TypeScript", "PostgreSQL", "SQLAlchemy", "FastAPI",
  "React", "Docker", "AWS", "Testing", "System Design",
  "Repository Pattern", "Clean Architecture",
];

export default function AboutPage() {
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
                    src={getImagePath("/assets/blog/authors/sion_big.webp")}
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
                    {[
                      { label: "GitHub", href: "https://github.com/sionabraham-senvo" },
                      { label: "LinkedIn", href: "https://www.linkedin.com/in/sionabraham/" },
                      { label: "Email", href: "mailto:sionabraham95@gmail.com" },
                    ].map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          target="_blank"
                          className="flex items-center justify-between text-sm font-medium text-foreground hover:text-primary transition-colors group"
                        >
                          <span>{link.label}</span>
                          <span aria-hidden className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              <article className="lg:col-span-2 space-y-8">
                <div className="font-serif text-lg md:text-xl leading-relaxed text-foreground space-y-5">
                  <p>
                    I&apos;m a software engineer with 8+ years building scalable applications,
                    specializing in backend development with Python, TypeScript, and database
                    optimization.
                  </p>
                  <blockquote className="border-l-4 border-primary pl-5 italic text-muted-foreground">
                    Great software isn&apos;t just about code — it&apos;s about creating elegant
                    solutions to complex problems.
                  </blockquote>
                  <p>
                    My work centers on clean architecture, design patterns, and performance.
                    I enjoy challenges from RESTful API design to efficient database solutions
                    with PostgreSQL and SQLAlchemy.
                  </p>
                  <p>
                    This blog is where I share insights, tutorials, and lessons from the trenches.
                    My aim is to make complex technical concepts accessible.
                  </p>
                  <p>
                    Off-screen, you&apos;ll find me with my dog, drinking coffee, or driving my
                    Volvo somewhere.
                  </p>
                </div>

                <div className="pt-8 border-t border-border">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    Skills &amp; expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 rounded-full border border-border bg-card text-sm text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-border">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                    Business inquiries
                  </h3>
                  <p className="text-base text-foreground/90">
                    Open to technical tutorials, conference speaking, and one-on-one coaching.
                    Reach out via email to discuss collaboration.
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
