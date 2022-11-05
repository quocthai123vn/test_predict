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
exports.resetDataController = void 0;
const match_service_1 = require("../services/match.service");
const status_constant_1 = require("../constants/status.constant");
const match_model_1 = __importDefault(require("../models/match.model"));
const prediction_model_1 = __importDefault(require("../models/prediction.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const sample_data_1 = require("../constants/sample.data");
const resetDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Promise.all([
            match_model_1.default.deleteMany({}),
            prediction_model_1.default.deleteMany({}),
            user_model_1.default.deleteMany({}),
        ]);
        yield Promise.all(sample_data_1.sampleMatch.map((data) => {
            (0, match_service_1.createMatchService)(data.epoch, data.matchName, data.startTime);
        }));
        return res.status(200).json({ message: status_constant_1.STATUS_CODE[200] });
    }
    catch (error) {
        console.log("Reset data error: ", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.resetDataController = resetDataController;
