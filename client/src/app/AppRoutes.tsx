import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout, PublicLayout, UserLayout } from "./Layouts";

const Home = lazy(() => import("@/pages/public/Home"));
const NotFound = lazy(() => import("@/pages/public/NotFound"));
const Register = lazy(() => import("@/pages/auth/Register"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Dashboard = lazy(() => import("@/pages/user/Dashboard"));
const Settings = lazy(() => import("@/pages/user/Settings"));

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
