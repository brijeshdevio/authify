import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { apiResponse } from "../../utils/apiResponse";
import { clearCookie, setCookie } from "../../lib/cookie";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private getUserId = (req: Request): string => {
    return ((req as any).user as { id: string }).id;
  };

  register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const data = await this.authService.register({ name, email, password });
    return apiResponse(res, {
      status: 201,
      data,
      message: "Registration successful",
    });
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const tokens = await this.authService.login({ email, password });
    setCookie(res, "accessToken", tokens.accessToken, {
      maxAge: 1000 * 60 * 15,
    });
    setCookie(res, "refreshToken", tokens.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
    });

    return apiResponse(res, {
      status: 200,
      message: "Login successful",
    });
  };

  logout = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    await this.authService.logout(refreshToken);
    clearCookie(res, "accessToken");
    clearCookie(res, "refreshToken");
    return apiResponse(res, {
      status: 200,
      message: "Logout successful",
    });
  };

  refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const tokens = await this.authService.refresh(refreshToken);
    setCookie(res, "accessToken", tokens.accessToken, {
      maxAge: 1000 * 60 * 15,
    });
    setCookie(res, "refreshToken", tokens.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
    });
    return apiResponse(res, {
      status: 200,
      message: "Refresh successful",
    });
  };

  changePassword = async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    await this.authService.changePassword(this.getUserId(req), {
      oldPassword,
      newPassword,
    });
    return apiResponse(res, {
      status: 200,
      message: "Password changed successfully",
    });
  };
}
