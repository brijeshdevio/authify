import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name is required")
      .max(30, "Name must be at most 30 characters"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be at most 30 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be at most 30 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Confirm Password must be match from password",
      });
    }
  })
  .strict();

export const LoginSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be at most 30 characters"),
  })
  .strict();

export const ForgotPasswordSchema = z
  .object({
    email: z.email("Invalid email address"),
  })
  .strict();

export const ResetPasswordSchema = z
  .object({
    token: z.string().min(1).optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be at most 30 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Confirm Password must be match from new password",
      });
    }
  })
  .strict();

export type RegisterDto = z.infer<typeof RegisterSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
