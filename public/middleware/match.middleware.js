"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkScoreMiddleware = exports.checkMatchIdMiddleware = exports.createMatchMiddleware = void 0;
const match_service_1 = require("../services/match.service");
const status_constant_1 = require("../constants/status.constant");
const other_util_1 = require("../util/other.util");
const createMatchMiddleware = (req, res, next) => {
    const { epoch, matchName, startTime } = req.body;
    if (!epoch) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing epoch" });
    }
    if (!matchName) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing match name" });
    }
    if (!startTime) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing start time" });
    }
    res.locals = {
        epoch,
        matchName,
        startTime,
    };
    return next();
};
exports.createMatchMiddleware = createMatchMiddleware;
const checkMatchIdMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const matchId = req.body.matchId || req.params.matchId || req.query.matchId;
    if (!matchId) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing matchId" });
    }
    const isMatchExist = yield (0, match_service_1.checkMatchExistService)((0, other_util_1.toObjectId)(matchId));
    if (!isMatchExist) {
        return res
            .status(404)
            .json({ message: status_constant_1.STATUS_CODE[404], error: "Match not found" });
    }
    res.locals.matchId = matchId;
    return next();
});
exports.checkMatchIdMiddleware = checkMatchIdMiddleware;
const checkScoreMiddleware = (req, res, next) => {
    const scores = req.body.scores;
    if (!scores) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing scores" });
    }
    if (scores.length !== 2) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Scores invalid" });
    }
    res.locals.scores = scores;
    return next();
};
exports.checkScoreMiddleware = checkScoreMiddleware;
