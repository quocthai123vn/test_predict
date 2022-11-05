"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const other_middleware_1 = require("../middleware/other.middleware");
const test_controller_1 = require("../controllers/test.controller");
const testRouter = express_1.default.Router();
testRouter.get("/reset", other_middleware_1.checkTestKeyMiddleware, test_controller_1.resetDataController);
exports.default = testRouter;
