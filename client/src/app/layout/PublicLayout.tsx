import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Spinner } from "@/components/ui/spinner";

export function PublicLayout() {
  return (
    <>
      <Suspense fallback={<Spinner className="h-screen" />}>
        <Navbar />
        <main className="mt-[68px] px-5 py-5 md:px-12">
          <Outlet />
        </main>
        <Footer />
      </Suspense>
    </>
  );
}
