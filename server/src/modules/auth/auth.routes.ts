import { Router } from "express";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { zodMiddleware } from "../../middleware/zod.middleware";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  sendVerifyEmailSchema,
} from "./auth.schema";
import { refreshTokenMiddleware } from "./auth.middleware";
import { authenticateMiddleware } from "../../middleware/authenticate.middleware";

export const authRoutes = Router();
const authController = new AuthController(new AuthService());

authRoutes.post(
  "/register",
  zodMiddleware(registerSchema),
  authController.register,
);
authRoutes.post("/login", zodMiddleware(loginSchema), authController.login);
authRoutes.post(
  "/logout",
  authenticateMiddleware,
  refreshTokenMiddleware,
  authController.logout,
);
authRoutes.post("/refresh", refreshTokenMiddleware, authController.refresh);
authRoutes.patch(
  "/change-password",
  zodMiddleware(changePasswordSchema),
  authenticateMiddleware,
  authController.changePassword,
);
authRoutes.get("/verify-email/:token", authController.verifyEmail);
authRoutes.post(
  "/send-verification-email",
  zodMiddleware(sendVerifyEmailSchema),
  authController.sendVerifyEmail,
);
authRoutes.post(
  "/forgot-password",
  zodMiddleware(forgotPasswordSchema),
  authController.forgotPassword,
);
authRoutes.post(
  "/reset-password/:token",
  zodMiddleware(resetPasswordSchema),
  authController.resetPassword,
);
