import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./auth.service";
import {
  LoginSchema,
  RegisterSchema,
  type LoginDto,
  type RegisterDto,
} from "./auth.schema";
import { notifyError, notifySuccess } from "@/utils/notify";

const useRegister = () =>
  useMutation({
    mutationKey: ["auth/register"],
    mutationFn: authService.register,
    onSuccess: (data) =>
      notifySuccess(data?.message ?? "Successfully registered"),
    onError: (error: unknown) => notifyError(error),
  });

export const useRegisterFacade = () => {
  const { mutate, isPending, isSuccess } = useRegister();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),
  });

  function submit(data: RegisterDto) {
    mutate(data);
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return { submit, isPending, register, handleSubmit, errors };
};

const useLogin = () =>
  useMutation({
    mutationKey: ["auth/login"],
    mutationFn: authService.login,
    onError: (error: unknown) => notifyError(error),
  });

export const useLoginFacade = () => {
  const { mutate, isPending, isSuccess } = useLogin();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginDto>({
    resolver: zodResolver(LoginSchema),
  });

  function submit(data: LoginDto) {
    mutate(data);
  }

  useEffect(() => {
    if (isSuccess) {
      window.location.href = "/dashboard";
    }
  }, [isSuccess]);

  return { submit, isPending, register, handleSubmit, errors };
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ["auth/logout"],
    mutationFn: authService.logout,
    onSuccess: (data) => {
      notifySuccess(data?.message ?? "Successfully logged out");
      window.location.href = "/auth/login";
    },
    onError: (error: unknown) => notifyError(error),
  });
};
