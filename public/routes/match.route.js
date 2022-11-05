"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const match_middleware_1 = require("../middleware/match.middleware");
const match_controller_1 = require("../controllers/match.controller");
const other_middleware_1 = require("../middleware/other.middleware");
const matchRouter = express_1.default.Router();
matchRouter.post("/create", match_middleware_1.createMatchMiddleware, match_controller_1.createMatchController);
matchRouter.post("/finalize", match_middleware_1.checkMatchIdMiddleware, match_middleware_1.checkScoreMiddleware, match_controller_1.finalizedMatchController);
matchRouter.post("/query", other_middleware_1.checkPageMiddleware, match_controller_1.queryMatchController);
matchRouter.get("/crawl", match_controller_1.crawlAirdropController);
exports.default = matchRouter;
