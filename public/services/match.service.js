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
exports.crawlAirdropService = exports.formatMatchService = exports.queryMatchService = exports.checkMatchExistService = exports.finalizedMatchService = exports.updateMatchService = exports.createMatchService = void 0;
const default_constant_1 = require("../constants/default.constant");
const match_model_1 = __importDefault(require("../models/match.model"));
const mongoose_util_1 = require("../util/mongoose.util");
const prediction_service_1 = require("./prediction.service");
const user_service_1 = require("./user.service");
const createMatchService = (epoch, matchName, startTime) => __awaiter(void 0, void 0, void 0, function* () {
    const match = (0, mongoose_util_1.createNewData)(match_model_1.default, { matchName, epoch, startTime });
    return match;
});
exports.createMatchService = createMatchService;
const updateMatchService = (matchId, position, amount, userAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const update = position === 0
        ? { $inc: { team1Amount: amount }, $push: { team1List: userAddress } }
        : { $inc: { team2Amount: amount }, $push: { team2List: userAddress } };
    yield match_model_1.default.updateOne({
        _id: matchId,
    }, update);
});
exports.updateMatchService = updateMatchService;
const finalizedMatchService = (matchId, scores) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield match_model_1.default.findOne({ _id: matchId }).lean();
    yield Promise.all([
        (0, prediction_service_1.setPredictionResultService)(matchId, scores),
        match_model_1.default.updateOne({ _id: matchId }, { scores, finalized: true }),
        scores[0] > scores[1]
            ? (0, user_service_1.updateUserResultService)(match.team1List, match.team2List)
            : scores[1] > scores[0]
                ? (0, user_service_1.updateUserResultService)(match.team2List, match.team1List)
                : {},
    ]);
});
exports.finalizedMatchService = finalizedMatchService;
const checkMatchExistService = (matchId) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield match_model_1.default.findOne({ _id: matchId }).select("_id").lean();
    return match ? true : false;
});
exports.checkMatchExistService = checkMatchExistService;
const queryMatchService = (matchName = undefined, status = 0, latest = true, pageId, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    const query = status === 0
        ? {}
        : status === 1
            ? {
                startTime: { $lt: Date.now() },
            }
            : status === 1
                ? { startTime: { $gte: Date.now() }, finalized: false }
                : { finalized: true };
    const sort = latest ? { createdAt: -1 } : { createdAt: 1 };
    const matches = yield (0, mongoose_util_1.queryAndPagination)(match_model_1.default, Object.assign(Object.assign({}, query), { matchName }), pageId, pageSize, sort);
    const formatData = [];
    for (let i = 0; i < matches.data.length; i++) {
        formatData.push(formatMatchService(matches.data[i]));
    }
    matches.data = formatData;
    return matches;
});
exports.queryMatchService = queryMatchService;
const formatMatchService = ({ _id, matchName, epoch, startTime, team1Amount, team2Amount, scores, finalized, }) => {
    const status = finalized
        ? default_constant_1.MATCH_STATUS[3]
        : startTime > Date.now()
            ? default_constant_1.MATCH_STATUS[1]
            : default_constant_1.MATCH_STATUS[2];
    return {
        _id,
        matchName,
        epoch,
        startTime,
        team1Amount,
        team2Amount,
        scores,
        ratio: team1Amount / team2Amount,
        status,
        totals: team1Amount + team2Amount,
    };
};
exports.formatMatchService = formatMatchService;
const crawlAirdropService = () => __awaiter(void 0, void 0, void 0, function* () {
    const epochs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const matches = yield match_model_1.default.find({ epoch: epochs });
    const users = new Set();
    matches.map((match) => {
        match.team1List.map((user) => {
            users.add(user);
        });
        match.team2List.map((user) => {
            users.add(user);
        });
    });
    const data = Array.from(users);
    return data;
});
exports.crawlAirdropService = crawlAirdropService;
