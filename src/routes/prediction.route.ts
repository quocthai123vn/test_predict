import express from "express";
import { createPredictionMiddleware } from "../middleware/prediction.middleware";
import { createPredictionController } from "../controllers/prediction.controller";
import { checkUserAddressMiddleware } from "../middleware/user.middleware";
import { checkMatchIdMiddleware } from "../middleware/match.middleware";

const predictionRouter = express.Router();

predictionRouter.post(
  "/create",
  checkUserAddressMiddleware,
  createPredictionMiddleware,
  checkMatchIdMiddleware,
  createPredictionController
);

export default predictionRouter;
