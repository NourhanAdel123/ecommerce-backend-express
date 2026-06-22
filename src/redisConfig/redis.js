import { createClient } from "redis";

export const redisClient = createClient();
redisClient.on("error", (err) => console.log("redis client error", err));
redisClient.on("connect", (err) =>
  console.log("redis client connected successfully", err),
);

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error;
  }
};
