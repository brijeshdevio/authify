import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full border-t px-8 py-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between md:flex-row">
        <div className="mb-8 text-center md:mb-0 md:text-left">
          <Link
            to="/"
            className="mb-2 block text-lg font-bold text-accent-foreground"
          >
            Authify
          </Link>
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Authify Inc. All rights reserved.
          </div>
        </div>
        <div className="flex items-center gap-8">
          <a
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            href="#"
          >
            Status
          </a>
        </div>
      </div>
    </footer>
  );
}
