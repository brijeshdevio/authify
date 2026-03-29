import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { authenticateMiddleware } from "../middleware/authenticate.middleware";

export const routes = Router();
routes.use("/auth", authRoutes);
routes.use("/users", authenticateMiddleware, userRoutes);
