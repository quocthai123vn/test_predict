import express from "express";
import {
  createClaimMiddleware,
  createPredictionMiddleware,
  setResultMiddleware,
} from "../middleware/prediction.middleware";
import {
  createPredictionController,
  createClaimController,
  setResultController,
} from "../controllers/prediction.controller";
import { checkUserAddressMiddleware } from "../middleware/user.middleware";

const predictionRouter = express.Router();

predictionRouter.post(
  "/predict",
  checkUserAddressMiddleware,
  createPredictionMiddleware,
  createPredictionController
);

predictionRouter.post("/set-result", setResultMiddleware, setResultController);

predictionRouter.post(
  "/claim",
  checkUserAddressMiddleware,
  createClaimMiddleware,
  createClaimController
);

export default predictionRouter;
