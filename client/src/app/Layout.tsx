import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/layouts/Navbar"
import { Footer } from "@/components/layouts/Footer"

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
  return (
    <>
      <Outlet />
    </>
  )
}

export function DashboardLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}
