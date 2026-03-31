import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "@/shared/ui/Loader";
import { Navbar } from "@/layouts/Navbar";
import { Footer } from "@/layouts/Footer";
import { useAuth } from "@/features/user/user.hooks";

export function AuthLayout() {
  const { isLoading, isAuthenticated } = useAuth();
  if (isLoading) return <Loader className="h-screen" />;
  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <>
      <Suspense fallback={<Loader className="h-screen" />}>
        <main className="flex h-screen w-full items-center justify-center">
          <section className="w-80 md:w-96">
            <Outlet />
          </section>
        </main>
      </Suspense>
    </>
  );
}

export function UserLayout() {
  const { isLoading, isAuthenticated } = useAuth();
  if (isLoading) return <Loader className="h-screen" />;
  if (!isAuthenticated) return <Navigate to="/auth/login" />;

  return (
    <>
      <Suspense fallback={<Loader className="h-screen" />}>
        <Navbar />
        <main className="mx-auto w-full p-5 md:w-[90%]">
          <Outlet />
        </main>
        <Footer />
      </Suspense>
    </>
  );
}

export function PublicLayout() {
  return (
    <>
      <Suspense fallback={<Loader className="h-screen" />}>
        <Navbar />
        <main className="py-10">
          <Outlet />
        </main>
        <Footer />
      </Suspense>
    </>
  );
}
