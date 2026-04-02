import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3).max(30),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30),
  })
  .strict();

export const loginSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
  })
  .strict();

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30),
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: "New password must be different from old password",
  })
  .strict();

export const sendVerifyEmailSchema = z
  .object({
    email: z.email("Invalid email address"),
  })
  .strict();

export const forgotPasswordSchema = z
  .object({
    email: z.email("Invalid email address"),
  })
  .strict();

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30),
  })
  .strict();

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
export type SendVerifyEmailDto = z.infer<typeof sendVerifyEmailSchema>;
export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
