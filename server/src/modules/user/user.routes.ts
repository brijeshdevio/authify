import { Router } from "express";
import { zodMiddleware } from "../../middleware/zod.middleware";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { changePasswordSchema, updateSchema } from "./user.schema";

export const userRoutes = Router();
const usercontroller = new UserController(new UserService());

userRoutes.get("/me", usercontroller.findById);
userRoutes.patch("/me", zodMiddleware(updateSchema), usercontroller.update);
userRoutes.get("/sessions", usercontroller.sessions);
userRoutes.get("/sessions/:sessionId", usercontroller.session);
userRoutes.patch(
  "/change-password",
  zodMiddleware(changePasswordSchema),
  usercontroller.changePassword,
);
