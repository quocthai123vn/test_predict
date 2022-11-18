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
exports.mostLoseLeaderBoardController = exports.highPredictLeaderBoardController = exports.highRewardLeaderBoardController = exports.mostWinLeaderBoardController = exports.getUserInfoController = exports.loginController = void 0;
const user_service_1 = require("../services/user.service");
const status_constant_1 = require("../constants/status.constant");
const user_repository_1 = require("../interfaces/user/user.repository");
const service = new user_service_1.UserService();
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAddress = res.locals.userAddress;
        const chainId = res.locals.chainId;
        const user = yield service.create(userAddress, chainId);
        return res.status(200).json({ message: status_constant_1.STATUS_CODE[200], data: user });
    }
    catch (error) {
        console.log("Login error: ", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.loginController = loginController;
const getUserInfoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userAddress = res.locals.userAddress;
    const chainId = res.locals.chainId;
    try {
        const user = yield service.getInfo(userAddress, chainId);
        return res.status(200).json({ message: status_constant_1.STATUS_CODE[200], data: user });
    }
    catch (error) {
        console.log("Login error: ", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.getUserInfoController = getUserInfoController;
const mostWinLeaderBoardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit } = req.query;
    if (!limit) {
        return res
            .status(400)
            .json({ error: "Missing limit", message: status_constant_1.STATUS_CODE[400] });
    }
    try {
        const users = yield service.getLeaderBoard(user_repository_1.LeaderBoardType.MOST_WIN, +limit);
        return res.status(200).json({ message: status_constant_1.STATUS_CODE[200], data: users });
    }
    catch (error) {
        console.log("Leader Board error: ", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.mostWinLeaderBoardController = mostWinLeaderBoardController;
const highRewardLeaderBoardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit } = req.query;
    if (!limit) {
        return res
            .status(400)
            .json({ error: "Missing limit", message: status_constant_1.STATUS_CODE[400] });
    }
    try {
        const users = yield service.getLeaderBoard(user_repository_1.LeaderBoardType.HIGH_REWARD, +limit);
        return res.status(200).json({ message: status_constant_1.STATUS_CODE[200], data: users });
    }
    catch (error) {
        console.log("Leader Board error: ", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.highRewardLeaderBoardController = highRewardLeaderBoardController;
const mostLoseLeaderBoardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit } = req.query;
    if (!limit) {
        return res
            .status(400)
            .json({ error: "Missing limit", message: status_constant_1.STATUS_CODE[400] });
    }
    try {
        const users = yield service.getLeaderBoard(user_repository_1.LeaderBoardType.MOST_LOSE, +limit);
        return res.status(200).json({ message: status_constant_1.STATUS_CODE[200], data: users });
    }
    catch (error) {
        console.log("Leader Board error: ", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.mostLoseLeaderBoardController = mostLoseLeaderBoardController;
const highPredictLeaderBoardController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit } = req.query;
    if (!limit) {
        return res
            .status(400)
            .json({ error: "Missing limit", message: status_constant_1.STATUS_CODE[400] });
    }
    try {
        const users = yield service.getLeaderBoard(user_repository_1.LeaderBoardType.HIGH_PREDICT, +limit);
        return res.status(200).json({ message: status_constant_1.STATUS_CODE[200], data: users });
    }
    catch (error) {
        console.log("Leader Board error: ", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.highPredictLeaderBoardController = highPredictLeaderBoardController;
