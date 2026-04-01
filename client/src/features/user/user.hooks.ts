import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { userService } from "./user.service";
import { useContext } from "react";
import { AuthContext } from "@/app/Provider";
import type { AxiosResponse } from "axios";
import { notifyError, notifySuccess } from "@/utils/notify";
import { UpdateSchema, type UpdateDto } from "./user.schema";

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

const useUpdate = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationKey: ["users/update"],
    mutationFn: userService.update,
    onSuccess: (data) => {
      notifySuccess(data?.message ?? "Successfully updated");
      queryClient.invalidateQueries({ queryKey: ["users/me"] });
    },
    onError: (error: unknown) => notifyError(error),
  });
};
export const useUpdateFacade = () => {
  const { mutate, isPending } = useUpdate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateDto>({
    resolver: zodResolver(UpdateSchema),
  });

  function submit(data: UpdateDto) {
    mutate(data);
  }

  return { submit, isPending, register, handleSubmit, errors };
};
