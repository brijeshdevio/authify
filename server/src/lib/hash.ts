import argon2 from "argon2";
import crypto from "crypto";

/**
 * Hash a password using argon2id (recommended variant).
 */
export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, { type: argon2.argon2id });
}

/**
 * Verify a password against an argon2 hash.
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, password);
}

/**
 * SHA-256 hash for refresh tokens.
 * Refresh tokens have high entropy, so a fast hash is sufficient
 * (unlike passwords which need slow hashing).
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
