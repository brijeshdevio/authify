import { Button } from "@/components/ui/button";
import { Question } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/40">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight">Authify</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link to="#" className="text-foreground relative">
              Product
              <span className="absolute -bottom-5 left-0 w-full h-[2px] bg-blue-600"></span>
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              Security
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              Enterprise
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Question weight="fill" className="h-4 w-4" />
          </button>
          
          <Link to="/login" className="hidden sm:inline-flex text-sm font-medium hover:text-foreground text-muted-foreground transition-colors">
            Login
          </Link>
          
          <Button asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
