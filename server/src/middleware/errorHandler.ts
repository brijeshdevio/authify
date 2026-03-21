import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import { AppError } from "../errors/AppError";
import { sendError } from "../lib/response";

/**
 * Global error handler.
 * Every unhandled error — thrown or rejected — ends up here.
 * Returns the standardized { success, statusCode, data, message, error } shape.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // ── Known application errors ────────────────────────────
  if (err instanceof AppError) {
    sendError(res, err.statusCode, err.message);
    return;
  }

  // ── Prisma: unique constraint violation ─────────────────
  if ((err as any).code === "P2002") {
    sendError(res, 409, "A record with this value already exists");
    return;
  }

  // ── Prisma: record not found ────────────────────────────
  if ((err as any).code === "P2025") {
    sendError(res, 404, "Record not found");
    return;
  }

  // ── Unexpected errors ───────────────────────────────────
  console.error("Unhandled error:", err);

  const errorDetail = env.NODE_ENV === "development"
    ? { message: err.message, stack: err.stack }
    : err.message;

  sendError(res, 500, errorDetail, "Internal server error");
}
