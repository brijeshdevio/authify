import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { PublicLayout } from "./layout/PublicLayout";
import { AuthLayout } from "./layout/AuthLayout";
import { ProtectLayout } from "./layout/ProtectLayout";

const Home = lazy(() => import("@/pages/public/Home"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Login = lazy(() => import("@/pages/auth/Login"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const VerifyEmail = lazy(() => import("@/pages/auth/VerifyEmail"));
const Dashboard = lazy(() => import("@/pages/protect/Dashboard"));
const Settings = lazy(() => import("@/pages/protect/Settings"));

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<ProtectLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
