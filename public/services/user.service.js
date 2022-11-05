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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserExistService = exports.getUserInfoService = exports.updateUserResultService = exports.createUserIfNotExistService = exports.findOneUserService = void 0;
const mongoose_util_1 = require("../util/mongoose.util");
const user_model_1 = __importDefault(require("../models/user.model"));
const prediction_service_1 = require("./prediction.service");
const findOneUserService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne(query).lean();
    return user;
});
exports.findOneUserService = findOneUserService;
const createUserIfNotExistService = (userAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.findOne({ userAddress });
    const user = isExist
        ? isExist
        : yield (0, mongoose_util_1.createNewData)(user_model_1.default, { userAddress, nonce: Date.now() });
    return user;
});
exports.createUserIfNotExistService = createUserIfNotExistService;
const updateUserResultService = (winnerList, loserList) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([
        user_model_1.default.updateMany({ userAddress: winnerList }, { $inc: { winNumber: 1 } }),
        user_model_1.default.updateMany({ userAddress: loserList }, { $inc: { loseNumber: 1 } }),
    ]);
});
exports.updateUserResultService = updateUserResultService;
const getUserInfoService = (userAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ userAddress }).lean();
    const total = yield (0, prediction_service_1.getTotalMatchOfUserService)(userAddress);
    return {
        userAddress,
        total,
        winRate: user.winNumber / total,
        loseRate: user.loseNumber / total,
    };
});
exports.getUserInfoService = getUserInfoService;
const checkUserExistService = (userAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default
        .findOne({ userAddress })
        .select("_id")
        .lean();
    return user ? true : false;
});
exports.checkUserExistService = checkUserExistService;
