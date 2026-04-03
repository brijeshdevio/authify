import { axiosClient } from "@/lib/axios";
import type { LoginDto, RegisterDto, ResetPasswordDto } from "./auth.schema";

export const authService = {
  register: (data: RegisterDto) =>
    axiosClient.post("/auth/register", data).then((res) => res.data),
  login: (data: LoginDto) =>
    axiosClient.post("/auth/login", data).then((res) => res.data),
  logout: () => axiosClient.post("/auth/logout").then((res) => res.data),
  resendVerifyEmail: (data: { email: string }) =>
    axiosClient
      .post("/auth/send-verification-email", data)
      .then((res) => res.data),
  forgotPassword: (data: { email: string }) =>
    axiosClient.post("/auth/forgot-password", data).then((res) => res.data),
  resetPassword: (data: ResetPasswordDto) =>
    axiosClient
      .post(`/auth/reset-password/${data.token}`, { password: data.password })
      .then((res) => res.data),
};
