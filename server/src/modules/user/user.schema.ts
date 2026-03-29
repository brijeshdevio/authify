import { z } from "zod";

export const updateSchema = z
  .object({
    name: z.string().min(3).max(30),
  })
  .strict();

export type UpdateDto = z.infer<typeof updateSchema>;
