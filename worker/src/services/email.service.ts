import { hashString, randomString } from "../lib/crypto";
import { sendEmail } from "../lib/mail";
import { logger } from "../lib/pino";
import { prisma } from "../lib/prisma";
import { resetPasswordTemplate } from "../templates/resetPassword.template";
import { verificationTemplate } from "../templates/verification.template";

export class EmailService {
  constructor() {}

  private calculateExpiry(ms: number) {
    return new Date(Date.now() + ms);
  }

  sendVerificationEmail = async (email: string) => {
    try {
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
    } catch (error) {
      logger.error(`Error sending verification email: ${error}`);
    }
  };

  sendResetPasswordEmail = async (email: string) => {
    try {
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
    } catch (error) {
      logger.error(`Error sending reset password email: ${error}`);
    }
  };
}
