import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authenticate } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import { changeNameSchema, changePasswordSchema } from "../validators/user.validator";

const router = Router();

// All user routes require authentication
router.use(authenticate);

router.get("/me", userController.getProfile);
router.patch("/me/name", validate(changeNameSchema), userController.changeName);
router.patch("/me/password", validate(changePasswordSchema), userController.changePassword);

export default router;
