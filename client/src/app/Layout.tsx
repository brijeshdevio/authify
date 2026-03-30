import { Link, Navigate, Outlet } from "react-router-dom"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"
import { useAuth } from "@/hooks/useAuth"
import { Loader } from "@/components/ui/loader"

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export function AuthLayout() {
  const { user, isLoading, isAuthenticated } = useAuth()

  if (isLoading) return <Loader className="h-screen" />
  if (user && isAuthenticated) return <Navigate to="/dashboard" replace />

  return (
    <>
      <div className="relative flex min-h-screen flex-col bg-[#f8f9fc]">
        {/* Background visual element */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-50/50 mix-blend-multiply blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/3 -translate-y-2/3 rounded-full bg-pink-50/40 mix-blend-multiply blur-3xl"></div>

        <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
      {/* Basic Footer specific to auth pages if needed, otherwise it relies on AuthLayout */}
      {/* Based on the image, the footer text `THE DIGITAL VAULT` etc is minimal on this page */}
      <footer className="w-full border-t border-slate-200/50 bg-transparent py-8">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:px-6 md:flex-row lg:px-8">
          <div className="flex flex-col items-center gap-1 text-slate-800 md:items-start">
            <Link to="/" className="text-lg font-black tracking-tight">
              Authify
            </Link>
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              The Digital Vault
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold tracking-widest text-slate-500 uppercase md:justify-end">
            <Link to="#" className="transition-colors hover:text-slate-900">
              Privacy Policy
            </Link>
            <Link to="#" className="transition-colors hover:text-slate-900">
              Terms of Service
            </Link>
            <Link to="#" className="transition-colors hover:text-slate-900">
              Help Center
            </Link>
            <Link to="#" className="transition-colors hover:text-slate-900">
              Security Audit
            </Link>
          </nav>

          <div className="hidden text-[11px] font-medium text-slate-400 lg:block">
            © 2024 Authify Security. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export function DashboardLayout() {
  const { user, isLoading, isAuthenticated } = useAuth()

  if (isLoading) return <Loader className="h-screen" />
  if (!user && !isAuthenticated) return <Navigate to="/login" />

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}
