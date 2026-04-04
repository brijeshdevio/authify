import { Request, Response } from "express";
import { UAParser } from "ua-parser-js";
import { AuthService } from "./auth.service";
import { apiResponse } from "../../utils/apiResponse";
import { clearCookie, setCookie } from "../../lib/cookie";
import { DeviceInfo } from "./auth.types";
import { getIpAddress } from "../../utils/ipAddress";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private getUserId = (req: Request): string => {
    return ((req as any).user as { id: string }).id;
  };

  deviceInfo = (req: Request): DeviceInfo => {
    const parser = new UAParser(req.headers["user-agent"]);
    const device = parser.getDevice();
    const os = parser.getOS();
    const browser = parser.getBrowser();

    let type: DeviceInfo["type"] = "laptop"; // default

    if (device.type === "mobile") type = "phone";
    else if (device.type === "tablet") type = "tablet";

    const deviceName = `${os.name || "Unknown OS"} - ${browser.name || "Unknown Browser"}`;

    return {
      type,
      deviceName,
      userAgent: req?.headers["user-agent"],
      ipAddress: getIpAddress(req),
    };
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

    const tokens = await this.authService.login(
      { email, password },
      this.deviceInfo(req),
    );
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

  verifyEmail = async (req: Request, res: Response) => {
    const token = req.params?.token as string;
    await this.authService.verifyEmail(token);
    return apiResponse(res, {
      status: 200,
      message: "Email verified successfully",
    });
  };

  sendVerifyEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    await this.authService.againSendVerificationToken(email);
    return apiResponse(res, {
      status: 200,
      message: "Verification email sent successfully",
    });
  };

  forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    await this.authService.forgotPassword(email);
    return apiResponse(res, {
      status: 200,
      message: "Password reset email sent successfully",
    });
  };

  resetPassword = async (req: Request, res: Response) => {
    const token = req.params?.token as string;
    const { password } = req.body;
    await this.authService.resetPassword(token, { password });
    return apiResponse(res, {
      status: 200,
      message: "Password reset successfully",
    });
  };
}
