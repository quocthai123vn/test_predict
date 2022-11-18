"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prediction_middleware_1 = require("../middleware/prediction.middleware");
const prediction_controller_1 = require("../controllers/prediction.controller");
const user_middleware_1 = require("../middleware/user.middleware");
const predictionRouter = express_1.default.Router();
predictionRouter.post("/predict", user_middleware_1.checkUserAddressMiddleware, prediction_middleware_1.createPredictionMiddleware, prediction_controller_1.createPredictionController);
predictionRouter.post("/set-result", prediction_middleware_1.setResultMiddleware, prediction_controller_1.setResultController);
predictionRouter.post("/claim", user_middleware_1.checkUserAddressMiddleware, prediction_middleware_1.createClaimMiddleware, prediction_controller_1.createClaimController);
exports.default = predictionRouter;
