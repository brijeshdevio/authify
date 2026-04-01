import { axiosClient } from "@/lib/axios";
import type { UpdateDto } from "./user.schema";

export const userService = {
  profile: () => axiosClient.get("/users/me").then((res) => res.data),
  update: (data: UpdateDto) =>
    axiosClient.patch("/users/me", data).then((res) => res.data),
  sessions: () => axiosClient.get("/users/sessions").then((res) => res.data),
};
