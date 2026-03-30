import { axiosClient } from "@/api/axiosClient"
import type { LoginDto, RegisterDto } from "./auth.schema"

export const AuthServices = {
  register: (data: RegisterDto) =>
    axiosClient.post("/auth/register", data).then((res) => res.data),
  login: (data: LoginDto) =>
    axiosClient.post("/auth/login", data).then((res) => res.data),
  logout: () => axiosClient.post("/auth/logout").then((res) => res.data),
}
