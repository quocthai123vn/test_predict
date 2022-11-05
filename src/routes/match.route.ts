import express from "express";
import {
  checkMatchIdMiddleware,
  checkScoreMiddleware,
  createMatchMiddleware,
} from "../middleware/match.middleware";
import {
  crawlAirdropController,
  createMatchController,
  finalizedMatchController,
  queryMatchController,
} from "../controllers/match.controller";
import { checkPageMiddleware } from "../middleware/other.middleware";

const matchRouter = express.Router();

matchRouter.post("/create", createMatchMiddleware, createMatchController);

matchRouter.post(
  "/finalize",
  checkMatchIdMiddleware,
  checkScoreMiddleware,
  finalizedMatchController
);

matchRouter.post("/query", checkPageMiddleware, queryMatchController);

matchRouter.get("/crawl", crawlAirdropController);

export default matchRouter;
