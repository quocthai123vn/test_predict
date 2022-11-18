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
exports.setResultController = exports.createClaimController = exports.createPredictionController = void 0;
const status_constant_1 = require("../constants/status.constant");
const prediction_service_1 = require("../services/prediction.service");
const service = new prediction_service_1.PredictionService();
const createPredictionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chainId, epoch, amount, position, userAddress } = res.locals;
    try {
        yield service.create(chainId, epoch, amount, position, userAddress);
        return res
            .status(200)
            .json({ message: status_constant_1.STATUS_CODE[200], data: "Predict successfully" });
    }
    catch (error) {
        console.log("Create prediction error", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.createPredictionController = createPredictionController;
const setResultController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chainId, epoch, scores } = res.locals;
    try {
        yield service.setResult(chainId, epoch, scores);
        return res
            .status(200)
            .json({ message: status_constant_1.STATUS_CODE[200], data: "Set result success" });
    }
    catch (error) {
        console.log("Set Result error", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.setResultController = setResultController;
const createClaimController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chainId, epoch, userAddress, amountReward } = res.locals;
    try {
        yield service.claim(chainId, epoch, userAddress, amountReward);
        return res
            .status(200)
            .json({ message: status_constant_1.STATUS_CODE[200], data: "successful claim" });
    }
    catch (error) {
        console.log("Create prediction error", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.createClaimController = createClaimController;
