import { Worker } from "bullmq";
import { connection } from "../config/redis";
import { prisma } from "../lib/prisma";
import { AuthService } from "../modules/auth/auth.service";

async function verifyEmail(userId: string) {
  await new AuthService().sendVerificationToken(userId);
}

async function resetPasswordEmail(userId: string) {
  await new AuthService().sendResetPasswordToken(userId);
}

new Worker(
  "email-queue",
  async (job) => {
    const { userId } = job.data;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
      },
    });

    if (!user?.id) return;

    if (job.name === "verify-email") verifyEmail(userId);
    if (job.name === "reset-password") resetPasswordEmail(userId);
  },
  {
    connection,
  },
);
