import { Server } from "socket.io";
import { redisClient } from "../db/redisClient";

export const onlineUsers = new Map<string, string>();

let io: Server;

export const initializeSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", async (socket) => {
    const { userName } = socket.handshake.query;
    if (userName) {
      await redisClient.set(`socket-${userName}`, socket.id);
      console.log(userName, "has connected to ", socket.id);
      const keys = await redisClient.keys("socket-*");
      const onlineUsers = keys.map((key) => key.replace("socket-", ""));
      io.emit("recieve-online-users", onlineUsers);
    }

    socket.on("disconnect", async () => {
      await redisClient.del(`socket-${userName}`);
      const keys = await redisClient.keys("socket-*");
      const onlineUsers = keys.map((key) => key.replace("socket-", ""));
      io.emit("recieve-online-users", onlineUsers);
      console.log(userName, "disconnected");
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
