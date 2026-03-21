import { z } from "zod/v4";

export const signupSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
