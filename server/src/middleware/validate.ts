import type { Request, Response, NextFunction } from "express";
import { z } from "zod/v4";
import { sendError } from "../lib/response";

/**
 * Generic Zod validation middleware factory.
 * Validates req.body against the provided schema.
 * On success, replaces req.body with the parsed (typed, sanitized) data.
 * On failure, returns 400 with structured error details.
 */
export function validate(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = z.prettifyError(result.error);
      sendError(res, 400, errors, "Validation failed");
      return;
    }

    req.body = result.data;
    next();
  };
}
