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
exports.PredictionService = void 0;
const user_model_1 = require("./../models/user.model");
const prediction_model_1 = require("../models/prediction.model");
class PredictionService {
    create(chainId, epoch, amount, position, userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                prediction_model_1.PredictionModel.create({
                    chainId,
                    epoch,
                    amount,
                    position,
                    userAddress,
                }),
                user_model_1.UserModel.updateOne({
                    chainId: chainId,
                    userAddress: userAddress
                }, {
                    $inc: { totalPrediction: amount }
                })
            ]);
        });
    }
    setResult(chainId, epoch, scores) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = scores[0] > scores[1]
                ? [{ result: 1 }, { result: 2 }]
                : scores[0] < scores[1]
                    ? [{ result: 2 }, { result: 1 }]
                    : [{ result: 3 }, { result: 3 }];
            yield Promise.all([
                prediction_model_1.PredictionModel.updateMany({ chainId, epoch, position: 0 }, update[0]),
                prediction_model_1.PredictionModel.updateMany({ chainId, epoch, position: 1 }, update[1]),
            ]);
        });
    }
    claim(chainId, epoch, userAddress, amountReward) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                prediction_model_1.PredictionModel.updateOne({
                    chainId: chainId,
                    epoch: epoch,
                    userAddress: userAddress,
                }, { amountReward: amountReward }),
                user_model_1.UserModel.updateOne({
                    chainId: chainId,
                    userAddress: userAddress
                }, {
                    $inc: { totalReward: amountReward, totalWin: 1 }
                })
            ]);
        });
    }
    getUserMatchAmount(chainId, userAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const predictions = yield prediction_model_1.PredictionModel.find({
                chainId,
                userAddress,
            })
                .select("_id")
                .lean();
            return predictions.length;
        });
    }
}
exports.PredictionService = PredictionService;
