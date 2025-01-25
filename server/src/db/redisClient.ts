import { createClient } from "redis";

export const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD!,
  socket: {
    host: process.env.REDIS_HOST!,
    port: parseInt(process.env.REDIS_PORT!),
  },
});
redisClient.connect();

redisClient.on("connect", function () {
  console.log("Connected to Redis");
});

redisClient.on("error", function (err) {
  console.log("Redis error: " + err);
});

