// blog/src/app/about/page.tsx
import Container from "@/app/_components/container";
import Image from "next/image";
import Link from "next/link";
import {Intro} from "@/app/_components/intro";

export default function AboutPage() {
  return (
    <main>
      <Container>
        <Intro />
        <div className="max-w-4xl mx-auto py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8" style={{ color: "var(--secondary)" }}>
            About the Author
          </h1>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Profile section */}
            <div className="md:w-1/3">
              <div className="rounded-lg overflow-hidden mb-6 shadow-lg">
                <Image
                  src="/assets/blog/authors/sion_big.png"
                  alt="Siôn Abraham"
                  width={300}
                  height={300}
                  className="object-cover w-full"
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold" style={{ color: "var(--secondary)" }}>Connect</h2>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="https://github.com/sionabraham-senvo"
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-90"
                    style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
                  >
                    <span>GitHub</span>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/sionabraham/"
                    target="_blank"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-90"
                    style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
                  >
                    <span>LinkedIn</span>
                  </Link>
                  <Link
                    href="mailto:sionabraham95@gmail.com"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:opacity-90"
                    style={{ backgroundColor: "var(--primary)", color: "var(--background)" }}
                  >
                    <span>Email</span>
                  </Link>
                </div>

                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: "var(--accent-light)" }}>
                  <h3 className="text-lg font-medium mb-2" style={{ color: "var(--secondary)" }}>Business Inquiries</h3>
                  <p className="text-sm" style={{ color: "var(--foreground)" }}>
                    I'm open to business opportunities including technical tutorials, conference speaking, and one-on-one coaching sessions.
                    Feel free to reach out via email to discuss collaboration.
                  </p>
                </div>
              </div>
            </div>

            {/* Bio section */}
            <div className="md:w-2/3 space-y-8">
              <div className="prose max-w-none" style={{ color: "var(--foreground)" }}>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--secondary)" }}>
                  Hello, I'm Siôn
                </h2>

                <p className="text-lg leading-relaxed">
                  I'm a passionate software engineer with over 8 years of experience building scalable applications,
                  specializing in backend development with Python, TypeScript, and database optimization.
                </p>

                <div className="my-6 p-4 border-l-4 italic"
                     style={{ borderColor: "var(--accent)", backgroundColor: "var(--accent-light)", borderRadius: "0 8px 8px 0" }}>
                  "I believe great software isn't just about code—it's about creating elegant solutions to complex problems."
                </div>

                <h3 className="text-xl font-medium mt-6 mb-3" style={{ color: "var(--secondary)" }}>Professional Focus</h3>
                <p>
                  My work centers around clean architecture, design patterns, and performance optimization.
                  I enjoy tackling challenges from developing RESTful APIs to implementing efficient database
                  solutions with PostgreSQL and SQLAlchemy.
                </p>

                <h3 className="text-xl font-medium mt-6 mb-3" style={{ color: "var(--secondary)" }}>About This Blog</h3>
                <p>
                  This is where I share insights, tutorials, and best practices from my professional journey.
                  I aim to make complex technical concepts accessible to everyone, regardless of their experience level.
                </p>

                <h3 className="text-xl font-medium mt-6 mb-3" style={{ color: "var(--secondary)" }}>Beyond Coding</h3>
                <p>
                  When I'm not immersed in code, you can find me out with my dog, drinking coffee, or traveling around
                  in my Volvo!
                </p>
              </div>

              <div className="pt-6 border-t" style={{ borderColor: "var(--accent-light)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--secondary)" }}>Skills & Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {['Python', 'TypeScript', 'PostgreSQL', 'SQLAlchemy', 'FastAPI', 'React', 'Docker',
                    'AWS', 'Testing', 'System Design', 'Repository Pattern', 'Clean Architecture'].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 text-sm rounded-full transition-all hover:scale-105"
                      style={{ backgroundColor: "var(--accent-light)", color: "var(--foreground)" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}