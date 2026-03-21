import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { authenticate } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import { loginLimiter, authLimiter } from "../middleware/rateLimiter";
import { signupSchema, loginSchema } from "../validators/auth.validator";

const router = Router();

// Public routes (rate-limited)
router.post("/signup", loginLimiter, validate(signupSchema), authController.signup);
router.post("/login", loginLimiter, validate(loginSchema), authController.login);
router.post("/refresh", authLimiter, authController.refresh);

// Protected routes (require valid access token)
router.post("/logout", authenticate, authController.logout);
router.get("/sessions", authenticate, authController.getSessions);
router.delete("/sessions/:id", authenticate, authController.revokeSession);

export default router;
