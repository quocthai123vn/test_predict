import express from "express";
import { checkTestKeyMiddleware } from "../middleware/other.middleware";
import { resetDataController } from "../controllers/test.controller";

const testRouter = express.Router();

testRouter.get("/reset", checkTestKeyMiddleware, resetDataController);

export default testRouter;
