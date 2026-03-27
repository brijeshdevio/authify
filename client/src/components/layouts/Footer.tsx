import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-8">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <Link to="/" className="text-lg font-bold tracking-tight">
            Authify
          </Link>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Authify Security. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold tracking-wider text-muted-foreground md:justify-end">
          <Link
            to="#"
            className="uppercase transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>
          <Link
            to="#"
            className="uppercase transition-colors hover:text-foreground"
          >
            Terms of Service
          </Link>
          <Link
            to="#"
            className="uppercase transition-colors hover:text-foreground"
          >
            Help Center
          </Link>
          <Link
            to="#"
            className="uppercase transition-colors hover:text-foreground"
          >
            Security Audit
          </Link>
        </nav>
      </div>
    </footer>
  )
}
