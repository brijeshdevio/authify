import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/useAuth";
import { Footer } from "@/components/layout/Footer";

export function AuthLayout() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <Spinner className="h-screen" />;
  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <>
      <Suspense fallback={<Spinner className="h-screen" />}>
        <Outlet />
        <Footer />
      </Suspense>
    </>
  );
}
