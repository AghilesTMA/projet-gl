import express from "express";
import { Response } from "express";
import "dotenv/config";
import { Router } from "./routes/router";
import cookieParser from "cookie-parser";
import cors from "cors";
import { whiteList } from "./config";
import Credentials from "./middlewares/credentials";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { createServer } from "http";
import { initializeSocket } from "./socket/serverSocket";


export const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: whiteList }));
app.use(Credentials);

app.get("/", (_, res: Response) => {
  res.json({ msg: "i hate my life!" });
});

//Defining Routes
Router(app, "/api");


// Connecting to database
(async () => {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("Database connection was established!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
})();


//Initializing server and socket server
initializeSocket(httpServer);
httpServer.listen(PORT, async () => {
  console.log("App is listening on port:" + PORT);
});