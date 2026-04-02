import { Worker } from "bullmq";
import { connection } from "../lib/redis";
import { JOBS, QUEUES } from "../constants";
import { EmailService } from "../services/email.service";
import { logger } from "../lib/pino";

const emailService = new EmailService();

new Worker(
  QUEUES.EMAIL,
  async (job) => {
    logger.info(`Processing job ${job.id}...`);
    switch (job.name) {
      case JOBS.SEND_VERIFICATION_EMAIL:
        await emailService.sendVerificationEmail(job.data?.email);
        logger.info(`Job ${job.id} completed`);
        break;
      case JOBS.RESET_PASSWORD_EMAIL:
        await emailService.sendResetPasswordEmail(job.data?.email);
        logger.info(`Job ${job.id} completed`);
        break;
      default:
        logger.warn(`Job ${job.id} not found`);
    }
  },
  { connection },
);
