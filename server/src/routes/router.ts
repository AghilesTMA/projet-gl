import { Express } from "express";
import authRouter from "./AuthRouter";
import ClientRouter from "./ClientRouter";
import ChatRouter from "./ChatRouter";

export const Router = (app: Express, url: string) => {
  app.use(`${url}/auth`, authRouter);
  app.use(`${url}/client`, ClientRouter);
  app.use(`${url}/chat`, ChatRouter);
};
