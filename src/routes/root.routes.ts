import express from "express";
import matchRouter from "./match.route";
import predictionRouter from "./prediction.route";
import testRouter from "./test.route";
import userRouter from "./user.route";

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);

rootRouter.use("/match", matchRouter);

rootRouter.use("/prediction", predictionRouter);

rootRouter.use("/test", testRouter);

export default rootRouter;
