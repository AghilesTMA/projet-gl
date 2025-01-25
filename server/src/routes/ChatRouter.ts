import express from "express";
import { verifyToken } from "../middlewares/verifyToken";
import { createChat, getMessages, sendMessage } from "../controllers/chatController";

const ChatRouter = express.Router();

ChatRouter.use(verifyToken);
ChatRouter.post("/createChat", createChat);
ChatRouter.post("/sendMessage", sendMessage);
ChatRouter.get("/getMessages/:chatId", getMessages);

export default ChatRouter;
