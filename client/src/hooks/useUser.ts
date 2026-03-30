import { useQuery } from "@tanstack/react-query"
import { axiosClient } from "@/api/axiosClient"
import { transform } from "@/utils/transform"

export function useUser() {
  return useQuery({
    queryKey: ["users/me"],
    queryFn: () => axiosClient.get("/users/me").then((res) => res.data),
    select: transform,
    retry: 0,
  })
}
