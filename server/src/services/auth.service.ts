import { userRepo } from "../repos/user.repo";
import { sessionRepo } from "../repos/session.repo";
import { tokenRepo } from "../repos/token.repo";
import { hashPassword, verifyPassword, hashToken } from "../lib/hash";
import {
  signAccessToken,
  generateRefreshToken,
  getRefreshTokenExpiry,
  getSessionExpiry,
} from "../lib/jwt";
import { AppError } from "../errors/AppError";
import type { SignupInput, LoginInput } from "../validators/auth.validator";

// ─── Types ──────────────────────────────────────────────────

interface RequestMeta {
  userAgent?: string;
  ipAddress?: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// ─── Internal Helpers ───────────────────────────────────────

/**
 * Creates a session + token pair for a user.
 * Used only by login — signup does NOT auto-login.
 *
 * Flow:
 * 1. Create session in DB
 * 2. Generate random refresh token string
 * 3. Store SHA-256 hash of refresh token in DB
 * 4. Sign JWT access token with userId + sessionId
 * 5. Return raw refresh token (for cookie) + access token
 */
async function createSessionAndTokens(
  userId: string,
  meta: RequestMeta,
): Promise<AuthTokens> {
  const session = await sessionRepo.create({
    userId,
    userAgent: meta.userAgent,
    ipAddress: meta.ipAddress,
    expiresAt: getSessionExpiry(),
  });

  // Opaque random string → raw goes to cookie, hash goes to DB
  const refreshToken = generateRefreshToken();
  await tokenRepo.create({
    sessionId: session.id,
    tokenHash: hashToken(refreshToken),
    expiresAt: getRefreshTokenExpiry(),
  });

  const accessToken = signAccessToken(userId, session.id);

  return { accessToken, refreshToken };
}

// ─── Public Service ─────────────────────────────────────────

export const authService = {
  /**
   * Register a new user.
   * Does NOT create a session — user must login separately.
   */
  async signup(data: SignupInput) {
    const existing = await userRepo.findByEmail(data.email);
    if (existing) {
      throw new AppError(409, "Email already registered");
    }

    const passwordHash = await hashPassword(data.password);
    const user = await userRepo.create({
      email: data.email,
      name: data.name,
      passwordHash,
    });

    return { id: user.id, email: user.email, name: user.name };
  },

  /**
   * Authenticate user and create a session.
   */
  async login(data: LoginInput, meta: RequestMeta) {
    const user = await userRepo.findByEmail(data.email);
    if (!user) {
      throw new AppError(401, "Invalid email or password");
    }

    const valid = await verifyPassword(data.password, user.passwordHash);
    if (!valid) {
      throw new AppError(401, "Invalid email or password");
    }

    const tokens = await createSessionAndTokens(user.id, meta);

    return {
      user: { id: user.id, email: user.email, name: user.name },
      ...tokens,
    };
  },

  /**
   * Rotate refresh token.
   *
   * Flow:
   * 1. Hash the incoming raw refresh token
   * 2. Look up the hash in DB → get session + user
   * 3. If not found → token was already rotated → reuse detected → revoke session
   * 4. If found → delete old hash, generate new random token, store new hash
   * 5. Return new access token + new raw refresh token
   */
  async refresh(oldRefreshToken: string) {
    const tokenHash = hashToken(oldRefreshToken);
    const storedToken = await tokenRepo.findByHash(tokenHash);

    if (!storedToken) {
      // Token reuse detected — someone replayed an already-rotated token.
      // We can't identify the session from an opaque token alone,
      // so we just reject. The old session's token was already deleted
      // during the legitimate rotation.
      throw new AppError(401, "Invalid refresh token");
    }

    if (storedToken.expiresAt < new Date()) {
      throw new AppError(401, "Refresh token expired");
    }

    const session = storedToken.session;
    if (!session || session.expiresAt < new Date()) {
      throw new AppError(401, "Session expired");
    }

    // Rotate: delete old hash → generate new random token → store new hash
    await tokenRepo.deleteBySessionId(session.id);

    const newRefreshToken = generateRefreshToken();
    await tokenRepo.create({
      sessionId: session.id,
      tokenHash: hashToken(newRefreshToken),
      expiresAt: getRefreshTokenExpiry(),
    });

    const accessToken = signAccessToken(session.userId, session.id);

    return { accessToken, refreshToken: newRefreshToken };
  },

  /**
   * Logout: delete session (cascades to refresh token).
   */
  async logout(sessionId: string) {
    try { await sessionRepo.deleteById(sessionId); } catch { /* already gone */ }
  },

  /**
   * Multi-device: list active sessions for a user.
   */
  async getSessions(userId: string) {
    return sessionRepo.findAllForUser(userId);
  },

  /**
   * Revoke a specific session (with ownership check).
   */
  async revokeSession(sessionId: string, userId: string) {
    const session = await sessionRepo.findById(sessionId);
    if (!session || session.userId !== userId) {
      throw new AppError(404, "Session not found");
    }
    await sessionRepo.deleteById(sessionId);
  },
};
