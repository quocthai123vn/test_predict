import express from "express";
import {
  highRewardLeaderBoardController,
  highPredictLeaderBoardController,
  mostLoseLeaderBoardController,
  mostWinLeaderBoardController,
} from "../controllers/user.controller";

const leaderBoardRouter = express.Router();

leaderBoardRouter.get("/most-win", mostWinLeaderBoardController);
leaderBoardRouter.get("/most-lose", mostLoseLeaderBoardController);
leaderBoardRouter.get("/high-predict", highPredictLeaderBoardController);
leaderBoardRouter.get("/high-reward", highRewardLeaderBoardController);

export default leaderBoardRouter;
