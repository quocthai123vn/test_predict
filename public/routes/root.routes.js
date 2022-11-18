"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leader_board_route_1 = __importDefault(require("./leader-board.route"));
const prediction_route_1 = __importDefault(require("./prediction.route"));
const user_route_1 = __importDefault(require("./user.route"));
const rootRouter = express_1.default.Router();
rootRouter.use("/user", user_route_1.default);
rootRouter.use("/prediction", prediction_route_1.default);
rootRouter.use("/leader-board", leader_board_route_1.default);
exports.default = rootRouter;
