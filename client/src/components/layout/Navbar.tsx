import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/features/auth/auth.hooks";

export function Navbar() {
  const { isAuthenticated } = useAuth();
  const { mutate, isPending } = useLogout();

  function handleLogout() {
    mutate();
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link
          to="/"
          className="text-accent-foreground text-xl font-bold tracking-tighter"
        >
          Authify
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link to={"/dashboard"}>
              <Button variant={"link"}>Dashboard</Button>
            </Link>
            <Link to={"/settings"} className="hidden md:flex">
              <Button variant={"link"}>Settings</Button>
            </Link>
            <Button onClick={handleLogout} isLoading={isPending}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden md:flex">
              <Button size={"lg"} variant={"outline"}>
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size={"lg"}>Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
