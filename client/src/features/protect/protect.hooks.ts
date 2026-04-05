import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import type { AxiosResponse } from "axios";
import { notifyError, notifySuccess } from "@/utils/notify";
import { protectService } from "./protect.service";
import { AuthContext } from "@/app/provider/AuthProvider";
import {
  ChangePasswordSchema,
  UpdateSchema,
  type ChangePasswordDto,
  type UpdateDto,
} from "./protect.schema";

import { useQueryClient } from "@tanstack/react-query";

export function useProfile() {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: protectService.profile,
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
    queryKey: ["users", "sessions"],
    queryFn: protectService.sessions,
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["users", "update"],
    mutationFn: protectService.update,
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

const useChangePassword = () => {
  return useMutation({
    mutationKey: ["users", "change-password"],
    mutationFn: protectService.changePassword,
    onSuccess: (data) =>
      notifySuccess(data?.message ?? "Successfully password changed"),
    onError: (error: unknown) => notifyError(error),
  });
};

export const useChangePasswordFacade = () => {
  const { mutate, isPending } = useChangePassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePasswordDto>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  function submit(data: ChangePasswordDto) {
    mutate(data);
  }

  return { submit, isPending, register, handleSubmit, errors };
};
