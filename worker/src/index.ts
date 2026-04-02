import { logger } from "./lib/pino";
import "./workers/email.worker";

logger.info(`Worker is running...`);
