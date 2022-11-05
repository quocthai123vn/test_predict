import express from "express";
import {
  getUserInfoController,
  loginController,
} from "../controllers/user.controller";
import { checkUserAddressMiddleware } from "../middleware/user.middleware";

const userRouter = express.Router();

userRouter.post("/login", checkUserAddressMiddleware, loginController);

userRouter.get("/info", checkUserAddressMiddleware, getUserInfoController);

export default userRouter;
