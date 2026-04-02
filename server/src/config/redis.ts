import ioRedis from "ioredis";
import { env } from "./env";

export const connection = new ioRedis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
});
