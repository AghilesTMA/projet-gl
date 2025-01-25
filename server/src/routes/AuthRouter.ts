import express from "express";
import { login, logout, signup, verifyLogin } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.get("/logout", logout);
authRouter.get("/verifyLogin", verifyLogin);

export default authRouter;
