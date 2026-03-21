import rateLimit from "express-rate-limit";

/**
 * General rate limiter for auth routes.
 * 20 requests per 15-minute window per IP.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    data: null,
    message: "Too many requests, please try again later",
    error: "Rate limit exceeded",
  },
});

/**
 * Strict rate limiter for login/signup.
 * 5 requests per 15-minute window per IP.
 * Prevents brute-force credential stuffing.
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    statusCode: 429,
    data: null,
    message: "Too many login attempts, please try again later",
    error: "Rate limit exceeded",
  },
});
