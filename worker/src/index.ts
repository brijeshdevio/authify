import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./lib/pino";
import "./workers/email.worker";

app.listen(env.PORT, () => {
  logger.info(`Worker running on port ${env.PORT}`);
});

logger.info(`Worker is running...`);
