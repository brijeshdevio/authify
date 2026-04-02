// workers/email.worker.ts
import { Worker } from "bullmq";
import { connection } from "../config/redis";
import { prisma } from "../lib/prisma";
import { AuthService } from "../modules/auth/auth.service";

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

    await new AuthService().sendVerificationToken(user.id);
  },
  {
    connection,
  },
);
