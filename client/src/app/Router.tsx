import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthLayout, DashboardLayout, PublicLayout } from "./Layout"

const Home = lazy(() => import("@/features/public/pages/Home"))
const NotFound = lazy(() => import("@/features/public/pages/NotFound"))
const Register = lazy(() => import("@/features/auth/pages/Register"))
const Login = lazy(() => import("@/features/auth/pages/Login"))
const EmailVerification = lazy(
  () => import("@/features/auth/pages/EmailVerification")
)
const ForgotPassword = lazy(
  () => import("@/features/auth/pages/ForgotPassword")
)
const Dashboard = lazy(() => import("@/features/dashboard/pages/Dashboard"))
const Session = lazy(() => import("@/features/dashboard/pages/Session"))
const Setting = lazy(() => import("@/features/dashboard/pages/Setting"))

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/session" element={<Session />} />
          <Route path="/setting" element={<Setting />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
