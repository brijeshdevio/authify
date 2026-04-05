import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function ProtectLayout() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <Spinner className="h-screen" />;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <>
      <Navbar />
      <Suspense fallback={<Spinner className="h-screen" />}>
        <main className="mt-[68px] px-5 py-10 md:px-12">
          <Outlet />
        </main>
      </Suspense>
      <Footer />
    </>
  );
}
