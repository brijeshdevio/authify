import { z } from "zod";

export const regsiterSchema = z
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

export type RegsiterDto = z.infer<typeof regsiterSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
