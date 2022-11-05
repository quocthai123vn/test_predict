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
exports.crawlAirdropController = exports.queryMatchController = exports.getMatchStatusController = exports.finalizedMatchController = exports.createMatchController = void 0;
const other_util_1 = require("../util/other.util");
const status_constant_1 = require("../constants/status.constant");
const match_service_1 = require("../services/match.service");
const default_constant_1 = require("../constants/default.constant");
const createMatchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { epoch, matchName, startTime } = res.locals;
    try {
        const match = yield (0, match_service_1.createMatchService)(epoch, matchName, startTime);
        return res.status(200).json({ message: status_constant_1.STATUS_CODE[200], data: match });
    }
    catch (error) {
        console.log("Create match controller: ", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.createMatchController = createMatchController;
const finalizedMatchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { matchId, scores } = res.locals;
    try {
        yield (0, match_service_1.finalizedMatchService)((0, other_util_1.toObjectId)(matchId), scores);
        return res.status(200).json({ message: status_constant_1.STATUS_CODE[200] });
    }
    catch (error) {
        console.log("Finalize match error: ", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.finalizedMatchController = finalizedMatchController;
const getMatchStatusController = (req, res) => {
    try {
        return res
            .status(200)
            .json({ message: status_constant_1.STATUS_CODE[200], data: default_constant_1.MATCH_STATUS });
    }
    catch (error) {
        console.log("Get match status error", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
};
exports.getMatchStatusController = getMatchStatusController;
const queryMatchController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { matchName, status, latest, pageId, pageSize } = res.locals;
    try {
        const matches = yield (0, match_service_1.queryMatchService)(matchName, status, latest, pageId, pageSize);
        return res.status(200).json({ message: status_constant_1.STATUS_CODE[200], matches });
    }
    catch (error) {
        console.log("Query match error: ", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.queryMatchController = queryMatchController;
const crawlAirdropController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, match_service_1.crawlAirdropService)();
        return res.status(200).json({ data });
    }
    catch (error) {
        console.log("Crawl airdrop error: ", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.crawlAirdropController = crawlAirdropController;
