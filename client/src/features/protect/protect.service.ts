import { axiosClient } from "@/lib/axios";
import type { ChangePasswordDto, UpdateDto } from "./protect.schema";

export const protectService = {
  profile: () => axiosClient.get("/users/me").then((res) => res.data),
  update: (data: UpdateDto) =>
    axiosClient.patch("/users/me", data).then((res) => res.data),
  sessions: () => axiosClient.get("/users/sessions").then((res) => res.data),
  changePassword: (data: ChangePasswordDto) =>
    axiosClient.patch("/users/change-password", data).then((res) => res.data),
};
