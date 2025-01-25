import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getProfile,
  getProfileByName,
  resetPassword,
  updateProfile,
} from "../controllers/clientController";
import { verifyToken } from "../middlewares/verifyToken";

const ClientRouter = Router();
ClientRouter.use(verifyToken);

ClientRouter.get("/profile", getProfile);
ClientRouter.get("/profile/:userName", getProfileByName);
ClientRouter.patch("/editProfile", updateProfile);
ClientRouter.patch("/changePassword", changePassword);
ClientRouter.get("/forgotPassword", forgotPassword);
ClientRouter.patch("/resetPassword", resetPassword);

export default ClientRouter;
