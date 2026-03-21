import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/jwt";
import { sendError } from "../lib/response";

/**
 * JWT authentication middleware.
 * Reads access token from httpOnly cookie (not Authorization header).
 *
 * Why cookie instead of Bearer header?
 * - Both tokens live in httpOnly cookies, consistent approach
 * - No need for client to manage tokens in memory/localStorage
 * - XSS cannot read httpOnly cookies
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.accessToken;

  if (!token) {
    sendError(res, 401, "Not authenticated");
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    (req as any).user = {
      userId: payload.sub,
      sessionId: payload.sid,
    };
    next();
  } catch {
    sendError(res, 401, "Invalid or expired access token");
  }
}
