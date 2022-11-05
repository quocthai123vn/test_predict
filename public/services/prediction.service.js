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
exports.getTotalMatchOfUserService = exports.setPredictionResultService = exports.createPredictionService = void 0;
const prediction_model_1 = __importDefault(require("../models/prediction.model"));
const mongoose_util_1 = require("../util/mongoose.util");
const match_service_1 = require("./match.service");
const createPredictionService = (matchId, amount, position, userAddress) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, match_service_1.updateMatchService)(matchId, position, amount, userAddress);
    const prediction = yield (0, mongoose_util_1.createNewData)(prediction_model_1.default, {
        userAddress,
        matchId,
        amount,
        position,
    });
    return prediction;
});
exports.createPredictionService = createPredictionService;
const setPredictionResultService = (matchId, scores) => __awaiter(void 0, void 0, void 0, function* () {
    const update = scores[0] > scores[1]
        ? [{ result: 1 }, { result: 2 }]
        : scores[0] < scores[1]
            ? [{ result: 2 }, { result: 1 }]
            : [{ result: 3 }, { result: 3 }];
    yield Promise.all([
        prediction_model_1.default.updateMany({ matchId, position: 0 }, update[0]),
        prediction_model_1.default.updateMany({ matchId, position: 1 }, update[1]),
    ]);
});
exports.setPredictionResultService = setPredictionResultService;
const getTotalMatchOfUserService = (userAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const predictions = yield prediction_model_1.default
        .find({ userAddress })
        .select("_id")
        .lean();
    return predictions.length;
});
exports.getTotalMatchOfUserService = getTotalMatchOfUserService;
const airdropStatisticService = () => __awaiter(void 0, void 0, void 0, function* () {
    const epoch = Array.from({ length: 16 }, (_, i) => i + 1);
    const prediction = yield prediction_model_1.default.find({ epoch });
});
