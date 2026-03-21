import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env";

// ─── Access Token (JWT) ─────────────────────────────────────

export interface AccessTokenPayload {
  sub: string;  // userId
  sid: string;  // sessionId
}

const ACCESS_TOKEN_EXPIRY = "15m";

export function signAccessToken(userId: string, sessionId: string): string {
  return jwt.sign({ sub: userId, sid: sessionId }, env.JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
}

// ─── Refresh Token (opaque random string) ───────────────────
// No JWT here — refresh tokens carry no payload.
// They're just random bytes used as a DB lookup key.
// Raw string → cookie, SHA-256 hash → DB.

export function generateRefreshToken(): string {
  return crypto.randomBytes(40).toString("hex"); // 80-char hex string
}

// ─── Expiry Helpers ─────────────────────────────────────────

/** Refresh token expiry: 7 days from now. */
export function getRefreshTokenExpiry(): Date {
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}

/** Session expiry: 7 days from now (same as refresh). */
export function getSessionExpiry(): Date {
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}
