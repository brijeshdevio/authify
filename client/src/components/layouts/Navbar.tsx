import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { Question } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

export function Navbar() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">Authify</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <Link to="#" className="relative text-foreground">
              Product
              <span className="absolute -bottom-5 left-0 h-[2px] w-full bg-blue-600"></span>
            </Link>
            <Link to="#" className="transition-colors hover:text-foreground">
              Security
            </Link>
            <Link to="#" className="transition-colors hover:text-foreground">
              Enterprise
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex">
            <Question weight="fill" className="h-4 w-4" />
          </button>
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              >
                Dashboard
              </Link>
              <Link
                to="/sessions"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              >
                Sessions
              </Link>
              <Link
                to="/settings"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              >
                Settings
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              >
                Login
              </Link>

              <Button asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
