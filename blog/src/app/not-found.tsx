import Link from "next/link";
import Image from "next/image";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <div className="flex flex-col items-center justify-center text-center min-h-[60vh] py-12">
            <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8">
              <Image
                src="/assets/blog/authors/sion_walking.webp"
                alt="Sion walking"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">404</p>
            <h2 className="font-serif text-h1-fluid font-semibold tracking-tight mb-4">
              It seems you&apos;re a little lost.
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              We all get lost sometimes. Head back to the homepage and start over from there.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Return home <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
