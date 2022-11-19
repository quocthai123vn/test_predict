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
exports.UserService = void 0;
const user_model_1 = require("../models/user.model");
const user_repository_1 = require("../interfaces/user/user.repository");
const prediction_service_1 = require("./prediction.service");
class UserService {
    getLeaderBoard(type, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = type === user_repository_1.LeaderBoardType.HIGH_PREDICT
                ? { totalPrediction: -1 }
                : type === user_repository_1.LeaderBoardType.HIGH_REWARD
                    ? { totalReward: -1 }
                    : type === user_repository_1.LeaderBoardType.MOST_WIN
                        ? { totalWin: -1 }
                        : { totalLose: -1 };
            const users = yield user_model_1.UserModel.aggregate([
                {
                    $project: {
                        chainId: "$chainId",
                        userAddress: "$userAddress",
                        totalWin: "$totalWin",
                        totalPrediction: "$totalPrediction",
                        amountPrediction: "$amountPrediction",
                        totalReward: "$totalReward",
                        totalLose: {
                            $subtract: ["$totalPrediction", "$totalWin"],
                        },
                    },
                },
                {
                    $limit: limit,
                },
                {
                    $sort: query,
                },
            ]);
            return users;
        });
    }
    findOne(userAddress, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ userAddress, chainId }).lean();
            return user;
        });
    }
    create(userAddress, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield user_model_1.UserModel.findOne({ userAddress, chainId });
            const user = isExist
                ? isExist
                : yield user_model_1.UserModel.create({ userAddress, chainId });
            return user;
        });
    }
    getInfo(userAddress, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne(userAddress, chainId);
            const predictionService = new prediction_service_1.PredictionService();
            const total = yield predictionService.getUserMatchAmount(chainId, userAddress);
            return {
                userAddress,
                total,
                winRate: user.totalWin ? user.totalWin / total : 0,
                loseRate: user.totalWin ? (total - user.totalWin) / total : 0,
            };
        });
    }
    isExist(userAddress, chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.UserModel.findOne({ userAddress, chainId })
                .select("_id")
                .lean();
            return user ? true : false;
        });
    }
}
exports.UserService = UserService;
