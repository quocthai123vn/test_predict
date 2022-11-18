"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const leaderBoardRouter = express_1.default.Router();
leaderBoardRouter.get("/most-win", user_controller_1.mostWinLeaderBoardController);
leaderBoardRouter.get("/most-lose", user_controller_1.mostLoseLeaderBoardController);
leaderBoardRouter.get("/high-predict", user_controller_1.highPredictLeaderBoardController);
leaderBoardRouter.get("/high-reward", user_controller_1.highRewardLeaderBoardController);
exports.default = leaderBoardRouter;
