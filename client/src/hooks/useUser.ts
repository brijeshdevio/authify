import { useQuery } from "@tanstack/react-query"
import { axiosClient } from "@/api/axiosClient"

export function useUser() {
  return useQuery({
    queryKey: ["users/me"],
    queryFn: () => axiosClient.get("/users/me").then((res) => res.data),
    retry: 0,
  })
}
