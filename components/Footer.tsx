export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-card-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © {currentYear} Neil Patrick Escobar. All rights reserved.
          </p>
          <p className="text-muted text-sm">
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Next.js
            </a>{" "}
            &{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Tailwind CSS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
