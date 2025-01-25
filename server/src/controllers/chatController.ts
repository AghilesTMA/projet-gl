import { sql } from "drizzle-orm";
import { db } from "../db";
import { Request, Response } from "express";
import { createChatReq, sendMessageReq } from "../types/zod";
import { chatTable, messagesTable } from "../db/schema";
import { getIO } from "../socket/serverSocket";
import { redisClient } from "../db/redisClient";

export const createChat = async (req: Request, res: Response) => {
  try {
    const { to } = req.body;
    createChatReq.parse({ to });
    const existingChat = await db.execute(sql`
      SELECT * FROM "chats"
      WHERE "firstUser" = ${req.id} OR "secondUser" = ${req.id};
    `);
    if (existingChat.length !== 0) {
      res.status(404).json({ msg: "Chat already exists!" });
      return;
    }

    const secondUser = await db.execute(sql`
      SELECT "id" from "clients"
      WHERE "userName" = ${to}
    `);

    if (secondUser.length < 1) {
      res.status(400).json({ msg: "it requires two user to create a chat!" });
    }

    const chat = await db.execute(sql`
      INSERT INTO "chats" ("firstUser","secondUser","img") values(
        ${req.id},
        ${secondUser[0].id},
        'no img'
      )
      RETURNING *
    `);

    res.status(200).json({ msg: "Chat created Successfully!" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error!" });
    return;
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, content } = req.body;
    sendMessageReq.parse({ chatId, content });
    const Message = await db.execute(sql`
      INSERT INTO ${messagesTable} ("sender","chatId","content") values(
        ${req.id},
        ${chatId},
        ${content}
      )
      RETURNING *;
    `);

    const convoParts: {
      firstUserId: string;
      secondUserId: string;
      firstUserName: string;
      secondUserName: string;
    }[] = await db.execute(sql`
        SELECT 
        "chat"."firstUser" AS "firstUserId",
        "firstUser"."userName" AS "firstUserName",
        "chat"."secondUser" AS "secondUserId",
        "secondUser"."userName" AS "secondUserName"
        FROM ${chatTable} AS chat
        JOIN "clients" AS "firstUser" ON "firstUser"."id" = "chat"."firstUser"
        JOIN "clients" AS "secondUser" ON "secondUser"."id" = "chat"."secondUser"
        WHERE "chat"."id" = ${chatId};
    `);

    const recieverUserName =
      convoParts[0].firstUserId === req.id
        ? convoParts[0].secondUserName
        : convoParts[0].firstUserName;

    const socketServer = getIO();
    const recieverSocket = await redisClient.get(`socket-${recieverUserName}`);

    if (recieverSocket && socketServer.sockets.sockets.has(recieverSocket)) {
      socketServer
        .to(recieverSocket)
        .emit("recieve-msg", chatId, false, content);
    }

    res.status(200).json({ msg: "Message was sent" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error happened!" });
    return;
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    const Messages: { sender: string; content: string }[] =
      await db.execute(sql`
      SELECT "sender","content","created_at" FROM ${messagesTable}
      WHERE "chatId" = ${chatId}
      ORDER BY "created_at" ASC
    `);

    if (Messages.length < 1) {
      res.status(404).json({ mgs: "No messages found!" });
      return;
    }

    const MessagesList = Messages.map((message) => ({
      sentByMe: message.sender === req.id,
      content: message.content,
    }));

    res.status(200).json({ msg: MessagesList });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error!" });
    return;
  }
};
