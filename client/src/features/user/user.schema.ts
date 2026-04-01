import { z } from "zod";

export const UpdateSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name is required")
      .max(30, "Name must be at most 30 characters"),
  })
  .strict();

export type UpdateDto = z.infer<typeof UpdateSchema>;
