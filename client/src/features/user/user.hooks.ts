import { useQuery } from "@tanstack/react-query";
import { userService } from "./user.service";
import { useContext } from "react";
import { AuthContext } from "@/app/Provider";
import type { AxiosResponse } from "axios";

export function useProfile() {
  return useQuery({
    queryKey: ["users/me"],
    queryFn: userService.profile,
    select: (data: AxiosResponse["data"]) => {
      return {
        user: data.data,
        ...data,
      };
    },
    retry: 0,
  });
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export function useSessions() {
  return useQuery({
    queryKey: ["users/sessions"],
    queryFn: userService.sessions,
    select: (data: AxiosResponse["data"]) => {
      return {
        sessions: data.data,
        ...data,
      };
    },
    retry: 0,
  });
}
