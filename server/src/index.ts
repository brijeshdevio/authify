import { env } from "./config/env";
import app from "./app";
import { prisma } from "./lib/prisma";

const isDevelopment = env.NODE_ENV === "development";
if (isDevelopment) {
  const server = app.listen(env.PORT, () => {
    console.log(`🚀 Authify server running on port ${env.PORT} [${env.NODE_ENV}]`);
  });

  // ─── Graceful Shutdown ──────────────────────────────────────
  async function shutdown() {
    console.log("\n🛑 Shutting down gracefully...");
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

}


export default app;