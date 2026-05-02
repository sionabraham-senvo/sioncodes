export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          Made with <span className="text-primary">♥</span> in Berlin
        </p>
        <p>© {new Date().getFullYear()} SionCodes.</p>
      </div>
    </footer>
  );
}

export default Footer;
