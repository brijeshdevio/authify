import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { PRISMA_CODES } from "../../constants/errorCodes";
import { hashPassword, verifyPassword } from "../../lib/argon";
import { prisma } from "../../lib/prisma";
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
} from "../../utils/exceptions";
import { hashString, randomString } from "../../lib/crypto";
import { signJwt } from "../../lib/jwt";
import {
  ChangePasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from "./auth.schema";
import { DeviceInfo } from "./auth.types";
// import { emailQueue } from "../../queues/email.queue";
import { JOBS } from "../../constants/queue";
import { sendEmail } from "../../lib/mail";
import { verificationTemplate } from "../../template/verification";
import { resetPasswordTemplate } from "../../template/resetPassword";

export const DUMMY_HASH =
  "$argon2id$v=19$m=65536,t=3,p=4$/y1jJS2H1+mZ1Sg77uvgAg$AYsdfipeVFRQxT2zXSCaw6581/ZdUV1I1MOjlng0fCM";

export class AuthService {
  constructor() {}

  private calculateExpiry(ms: number) {
    return new Date(Date.now() + ms);
  }

  private async createSession(userId: string, deviceInfo: DeviceInfo) {
    const token = randomString(64);
    const tokenHash = hashString(token);

    await prisma.session.create({
      data: {
        userId,
        expiresAt: this.calculateExpiry(7 * 24 * 60 * 60 * 1000),
        ...deviceInfo,
        refreshToken: {
          create: {
            tokenHash,
            expiresAt: this.calculateExpiry(24 * 60 * 60 * 1000),
          },
        },
      },
    });
    return token;
  }

  private async sendVerificationEmail(email: string) {
    const token = randomString(36);
    const tokenHash = hashString(token);
    const user = await prisma.user.update({
      where: { email },
      data: {
        verificationTokens: {
          create: {
            tokenHash,
            expiresAt: this.calculateExpiry(10 * 60 * 1000),
            type: "EMAIL_VERIFY",
          },
        },
      },
    });
    await sendEmail(
      user.email,
      "Verify Email",
      verificationTemplate({ token }),
    );
  }

  private async sendResetPasswordEmail(email: string) {
    const token = randomString(36);
    const tokenHash = hashString(token);
    const user = await prisma.user.update({
      where: { email },
      data: {
        verificationTokens: {
          create: {
            tokenHash,
            expiresAt: this.calculateExpiry(10 * 60 * 1000),
            type: "PASSWORD_RESET",
          },
        },
      },
    });
    await sendEmail(
      user.email,
      "Reset Password",
      resetPasswordTemplate({ token }),
    );
  }

  private async createRefreshToken(sessionId: string) {
    const token = randomString(64);
    const tokenHash = hashString(token);
    await prisma.refreshToken.create({
      data: {
        tokenHash,
        expiresAt: this.calculateExpiry(24 * 60 * 60 * 1000),
        sessionId,
      },
    });
    return token;
  }

  async verifyEmail(token: string) {
    const tokenHash = hashString(token);
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        tokenHash,
        expiresAt: { gt: new Date() },
        user: { isVerified: false },
      },
    });

    if (!verificationToken) {
      throw new BadRequestException("Invalid or expired token");
    }

    await prisma.verificationToken.delete({
      where: { id: verificationToken?.id },
    });

    await prisma.user.update({
      where: { id: verificationToken?.userId },
      data: {
        isVerified: true,
        verifiedAt: new Date(),
      },
    });
  }

  async againSendVerificationToken(email: string) {
    const user = await prisma.user.findUnique({
      where: { email, isVerified: false },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      throw new BadRequestException("Invalid email");
    }

    await this.sendVerificationEmail(user.email);
  }

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: { email, isVerified: true },
    });

    if (!user) {
      throw new BadRequestException("Invalid email");
    }

    await this.sendResetPasswordEmail(user.email);
  }

  async register(data: RegisterDto) {
    try {
      const hashedPassword = await hashPassword(data.password);
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      await this.sendVerificationEmail(data.email);
      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.CONFLICT
      ) {
        throw new ConflictException(
          `${data.email} already exists. Use another email.`,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async login(data: LoginDto, deviceInfo: DeviceInfo) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    const passwordHash = user?.passwordHash ?? DUMMY_HASH;
    const isPasswordValid = await verifyPassword(passwordHash, data.password);

    if (!user || !isPasswordValid) {
      throw new ForbiddenException("Invalid credentials");
    }

    if (!user.isVerified) {
      throw new ForbiddenException("Please verify your email.");
    }

    const refreshToken = await this.createSession(user.id, deviceInfo);
    const accessToken = signJwt({ sub: user.id, role: user.role });

    return { refreshToken, accessToken };
  }

  async logout(token: string) {
    try {
      const tokenHash = hashString(token);
      const refreshToken = await prisma.refreshToken.delete({
        where: { tokenHash, expiresAt: { gt: new Date() } },
        include: {
          session: true,
        },
      });
      if (!refreshToken) {
        throw new ForbiddenException("Invalid or expired token");
      }

      await prisma.session.delete({
        where: { id: refreshToken.sessionId },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.NOT_FOUND
      ) {
        throw new ForbiddenException("Invalid or expired token");
      }

      throw new InternalServerErrorException();
    }
  }

  async refresh(token: string) {
    try {
      const tokenHash = hashString(token);

      const refreshToken = await prisma.refreshToken.delete({
        where: { tokenHash, expiresAt: { gt: new Date() } },
        include: {
          session: true,
        },
      });

      if (!refreshToken) {
        throw new ForbiddenException("Invalid or expired token");
      }

      const newRefreshToken = await this.createRefreshToken(
        refreshToken.sessionId,
      );

      return {
        accessToken: signJwt({ sub: refreshToken.session.userId }),
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.NOT_FOUND
      ) {
        throw new ForbiddenException("Invalid or expired token");
      }

      throw new InternalServerErrorException();
    }
  }

  async changePassword(userId: string, data: ChangePasswordDto) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ForbiddenException();
    }

    const isPasswordValid = await verifyPassword(
      user?.passwordHash,
      data.oldPassword,
    );

    if (!isPasswordValid) {
      throw new BadRequestException(`Invalid old password`);
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: await hashPassword(data.newPassword),
      },
    });
  }

  async resetPassword(token: string, data: ResetPasswordDto) {
    const tokenHash = hashString(token);
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        tokenHash,
        expiresAt: { gt: new Date() },
        type: "PASSWORD_RESET",
      },
    });

    if (!verificationToken) {
      throw new ForbiddenException("Invalid or expired token");
    }

    await prisma.verificationToken.delete({
      where: { id: verificationToken?.id },
    });

    await prisma.user.update({
      where: { id: verificationToken?.userId },
      data: {
        passwordHash: await hashPassword(data.password),
      },
    });
  }
}
