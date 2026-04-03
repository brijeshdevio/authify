import ioRedis from "ioredis";
import { env } from "./env";

export const connection = new ioRedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});
if (connection) {
  console.log(`✅ Redis is ready to connect.`);
} else {
  console.error(`❌ Redis is not ready to connect.`);
}
