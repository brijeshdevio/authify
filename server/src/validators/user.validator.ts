import { z } from "zod/v4";

export const changeNameSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters").max(128),
});

export type ChangeNameInput = z.infer<typeof changeNameSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
