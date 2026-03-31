import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BrickWallShield, Menu, X } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/features/user/user.hooks";
import { useLogout } from "@/features/auth/auth.hooks";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { mutate, isPending } = useLogout();

  const handleLogout = () => {
    mutate();
  };

  return (
    <nav className="bg-base-100/70 sticky top-0 z-50 w-full rounded-b-xl border-b border-white/10 p-3 bg-blend-hard-light shadow backdrop-blur-sm">
      <div className="mx-auto flex items-center justify-between md:container">
        <Link to={"/"} className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2">
            <span className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <BrickWallShield className="h-6 w-6" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-lg font-semibold tracking-tight">
                Authify
              </span>
              <span className="text-base-content/50 text-[11px] font-medium tracking-[0.18em] uppercase">
                Security, at your fingertips
              </span>
            </span>
          </div>
        </Link>

        <div className="hidden items-center space-x-6 md:flex">
          {isAuthenticated ? (
            <>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                  `hover:text-primary text-sm opacity-80 hover:opacity-100 ${isActive ? "text-primary opacity-100" : ""}`
                }
              >
                Dashboard
              </NavLink>
              <Button onClick={handleLogout} isLoading={isPending}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to={"/auth/login"}
                className="hover:text-primary text-sm opacity-80 hover:opacity-100"
              >
                Login
              </Link>
              <Link to={"/auth/register"}>
                <Button className="btn-primary btn-md text-sm">
                  Create Account
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="dropdown-toggle btn btn-text btn-circle dropdown-open:bg-base-content/10 dropdown-open:text-base-content"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="mt-3 md:hidden">
          <div className="flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                <Link to={"/dashboard"} onClick={() => setIsOpen(false)}>
                  <Button className="btn-ghost btn-md w-full text-sm">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  isLoading={isPending}
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to={"/auth/login"} onClick={() => setIsOpen(false)}>
                  <Button className="btn-ghost btn-md w-full text-sm">
                    Login
                  </Button>
                </Link>
                <Link to={"/auth/register"} onClick={() => setIsOpen(false)}>
                  <Button className="btn-primary btn-md w-full text-sm">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
