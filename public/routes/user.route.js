"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const user_middleware_1 = require("../middleware/user.middleware");
const userRouter = express_1.default.Router();
userRouter.post("/login", user_middleware_1.checkUserAddressMiddleware, user_controller_1.loginController);
userRouter.get("/info", user_middleware_1.checkUserAddressMiddleware, user_controller_1.getUserInfoController);
exports.default = userRouter;
