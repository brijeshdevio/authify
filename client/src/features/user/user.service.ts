import { axiosClient } from "@/lib/axios";

export const userService = {
  profile: () => axiosClient.get("/users/me").then((res) => res.data),
  sessions: () => axiosClient.get("/users/sessions").then((res) => res.data),
};
