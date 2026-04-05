import { z } from "zod";

export const UpdateSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name is required")
      .max(30, "Name must be at most 30 characters"),
  })
  .strict();

export const ChangePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be at most 30 characters"),

    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be at most 30 characters"),

    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be at most 30 characters"),
  })
  .superRefine((data, ctx) => {
    // Passwords must match
    if (data.newPassword !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"], // 👈 attach error to field
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }

    // New password must differ from old
    if (data.newPassword === data.oldPassword) {
      ctx.addIssue({
        path: ["newPassword"], // 👈 attach error properly
        code: z.ZodIssueCode.custom,
        message: "New password must be different from old password",
      });
    }
  })
  .strict();

export type UpdateDto = z.infer<typeof UpdateSchema>;
export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
