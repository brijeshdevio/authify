import type { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service";
import { sendSuccess } from "../lib/response";

function getUserId(req: Request): string {
  return ((req as any).user as { userId: string }).userId;
}

export const userController = {
  async getProfile(req: Request, res: Response, _next: NextFunction) {
    const profile = await userService.getProfile(getUserId(req));
    sendSuccess(res, 200, { user: profile });
  },

  async changeName(req: Request, res: Response, _next: NextFunction) {
    const user = await userService.changeName(getUserId(req), req.body);
    sendSuccess(res, 200, { user }, "Name updated");
  },

  async changePassword(req: Request, res: Response, _next: NextFunction) {
    await userService.changePassword(getUserId(req), req.body);
    sendSuccess(res, 200, null, "Password changed");
  },
};
