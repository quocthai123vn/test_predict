import express from "express";
import leaderBoardRouter from "./leader-board.route";
import predictionRouter from "./prediction.route";
import userRouter from "./user.route";

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);

rootRouter.use("/prediction", predictionRouter);

rootRouter.use("/leader-board", leaderBoardRouter);

export default rootRouter;
