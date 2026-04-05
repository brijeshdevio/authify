import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { authService } from "./auth.service";
import {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
  type ForgotPasswordDto,
  type LoginDto,
  type RegisterDto,
  type ResetPasswordDto,
} from "./auth.schema";
import { notifyError, notifySuccess } from "@/utils/notify";
import { useParams } from "react-router-dom";

const useRegister = () =>
  useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: authService.register,
    onSuccess: (data) =>
      notifySuccess(data?.message ?? "Successfully registered"),
    onError: (error: unknown) => notifyError(error),
  });

export const useRegisterFacade = () => {
  const { mutate, isPending, isSuccess } = useRegister();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<RegisterDto>({
    resolver: zodResolver(RegisterSchema),
  });

  function submit(data: RegisterDto) {
    mutate(data);
  }

  return {
    submit,
    isPending,
    register,
    handleSubmit,
    errors,
    isSuccess,
    getValues,
  };
};

const useLogin = () =>
  useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: authService.login,
    onSuccess: () => {
      window.location.href = "/dashboard";
    },
    onError: (error: unknown) => notifyError(error),
  });

export const useLoginFacade = () => {
  const { mutate, isPending } = useLogin();

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

  return { submit, isPending, register, handleSubmit, errors };
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: authService.logout,
    onSuccess: (data) => {
      notifySuccess(data?.message ?? "Successfully logged out");
      window.location.href = "/login";
    },
    onError: (error: unknown) => notifyError(error),
  });
};

export const useResendVerifyEmail = (data: { email: string }) => {
  return useMutation({
    mutationKey: ["auth", "resend-verify-email"],
    mutationFn: () => authService.resendVerifyEmail(data),
    onSuccess: (data) => notifySuccess(data?.message ?? "Successfully sent"),
    onError: (error: unknown) => notifyError(error),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ["auth", "forgot-password"],
    mutationFn: authService.forgotPassword,
    onSuccess: (data) => notifySuccess(data?.message ?? "Successfully sent"),
    onError: (error: unknown) => notifyError(error),
  });
};

export const useForgotPasswordFacade = () => {
  const { mutate, isPending, isSuccess } = useForgotPassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordDto>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  function submit(data: ForgotPasswordDto) {
    mutate(data);
  }

  return { submit, isPending, register, handleSubmit, errors, isSuccess };
};

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["auth", "reset-password"],
    mutationFn: authService.resetPassword,
    onSuccess: (data) =>
      notifySuccess(data?.message ?? "Password reset successfully"),
    onError: (error: unknown) => notifyError(error),
  });
};

export const useResetPasswordFacade = () => {
  const { token } = useParams();
  const { mutate, isPending, isSuccess } = useResetPassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordDto>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  function submit(data: ResetPasswordDto) {
    mutate({ ...data, token: token ?? "" });
  }

  return { submit, isPending, register, handleSubmit, errors, isSuccess };
};

export const useVerifyEmail = (token: string) => {
  return useMutation({
    mutationKey: ["auth", "verify-email"],
    mutationFn: () => authService.verifyEmail(token),
    onSuccess: (data) => {
      notifySuccess(data?.message ?? "Email verified successfully");
    },
    onError: (error: unknown) => notifyError(error),
  });
};

export const useVerifyEmailFacade = (token: string) => {
  const { mutate: verifyMutate, isPending } = useVerifyEmail(token);

  function verify() {
    verifyMutate();
  }

  return { verify, isPending };
};
