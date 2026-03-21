import type { Request, Response, NextFunction, CookieOptions } from "express";
import { authService } from "../services/auth.service";
import { sendSuccess, sendError } from "../lib/response";
import { env } from "../config/env";

// ─── Types ──────────────────────────────────────────────────

interface AuthUser {
  userId: string;
  sessionId: string;
}

// ─── Cookie Config ──────────────────────────────────────────

const COOKIE_BASE: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
};

const ACCESS_COOKIE = "accessToken";
const REFRESH_COOKIE = "refreshToken";

const ACCESS_MAX_AGE = 15 * 60 * 1000;           // 15 min
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Sets both access and refresh tokens as httpOnly cookies.
 *
 * Why cookies for BOTH tokens?
 * - httpOnly prevents XSS from stealing tokens
 * - No tokens in response body = nothing to leak via logs or client storage
 * - Access token cookie has short maxAge (15m), refresh has long (7d)
 */
function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  res.cookie(ACCESS_COOKIE, accessToken, {
    ...COOKIE_BASE,
    path: "/",                    // available to all routes
    maxAge: ACCESS_MAX_AGE,
  });
  res.cookie(REFRESH_COOKIE, refreshToken, {
    ...COOKIE_BASE,
    path: "/api/auth/refresh",    // only sent to the refresh endpoint
    maxAge: REFRESH_MAX_AGE,
  });
}

function clearAuthCookies(res: Response) {
  res.clearCookie(ACCESS_COOKIE, { path: "/" });
  res.clearCookie(REFRESH_COOKIE, { path: "/api/auth/refresh" });
}

// ─── Helpers ────────────────────────────────────────────────

function getRequestMeta(req: Request) {
  return {
    userAgent: req.headers["user-agent"],
    ipAddress: req.ip,
  };
}

function getUser(req: Request): AuthUser {
  return (req as any).user as AuthUser;
}

// ─── Controller ─────────────────────────────────────────────
// No try/catch — Express 5 automatically catches async rejections
// and forwards them to the global error handler.

export const authController = {
  async signup(req: Request, res: Response, _next: NextFunction) {
    const user = await authService.signup(req.body);
    sendSuccess(res, 201, { user }, "Account created. Please login.");
  },

  async login(req: Request, res: Response, _next: NextFunction) {
    const result = await authService.login(req.body, getRequestMeta(req));

    setAuthCookies(res, result.accessToken, result.refreshToken);

    sendSuccess(res, 200, { user: result.user }, "Login successful");
  },

  async refresh(req: Request, res: Response, _next: NextFunction) {
    const oldToken = req.cookies?.[REFRESH_COOKIE];
    if (!oldToken) {
      sendError(res, 401, "No refresh token provided");
      return;
    }

    const result = await authService.refresh(oldToken);

    setAuthCookies(res, result.accessToken, result.refreshToken);

    sendSuccess(res, 200, null, "Token refreshed");
  },

  async logout(req: Request, res: Response, _next: NextFunction) {
    await authService.logout(getUser(req).sessionId);

    clearAuthCookies(res);

    sendSuccess(res, 200, null, "Logged out successfully");
  },

  async getSessions(req: Request, res: Response, _next: NextFunction) {
    const user = getUser(req);
    const sessions = await authService.getSessions(user.userId);

    sendSuccess(res, 200, { sessions, currentSessionId: user.sessionId });
  },

  async revokeSession(req: Request, res: Response, _next: NextFunction) {
    const user = getUser(req);
    const sessionId = req.params.id as string;

    await authService.revokeSession(sessionId, user.userId);

    sendSuccess(res, 200, null, "Session revoked");
  },
};
