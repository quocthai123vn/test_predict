"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const match_route_1 = __importDefault(require("./match.route"));
const prediction_route_1 = __importDefault(require("./prediction.route"));
const test_route_1 = __importDefault(require("./test.route"));
const user_route_1 = __importDefault(require("./user.route"));
const rootRouter = express_1.default.Router();
rootRouter.use("/user", user_route_1.default);
rootRouter.use("/match", match_route_1.default);
rootRouter.use("/prediction", prediction_route_1.default);
rootRouter.use("/test", test_route_1.default);
exports.default = rootRouter;
