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
exports.createClaimMiddleware = exports.setResultMiddleware = exports.createPredictionMiddleware = void 0;
const status_constant_1 = require("../constants/status.constant");
const createPredictionMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, position, epoch } = req.body;
    if (!amount) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing amount" });
    }
    if (position === undefined) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing position" });
    }
    if (!epoch) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing epoch" });
    }
    res.locals.amount = amount;
    res.locals.position = position;
    res.locals.epoch = epoch;
    return next();
});
exports.createPredictionMiddleware = createPredictionMiddleware;
const setResultMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { epoch, scores } = req.body;
    if (!epoch) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing epoch" });
    }
    if (!scores || scores.length !== 2) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing scores" });
    }
    res.locals.epoch = epoch;
    res.locals.scores = scores;
    return next();
});
exports.setResultMiddleware = setResultMiddleware;
const createClaimMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { epoch, amountReward } = req.body;
    if (!epoch) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing epoch" });
    }
    if (!amountReward) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing amountReward" });
    }
    res.locals.epoch = epoch;
    res.locals.amountReward = amountReward;
    return next();
});
exports.createClaimMiddleware = createClaimMiddleware;
