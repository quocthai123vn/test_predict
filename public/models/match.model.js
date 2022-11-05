"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const match = new Schema({
    matchName: { type: String, require: true },
    epoch: { type: String, require: true, unique: true },
    startTime: { type: Number, require: true },
    team1Amount: { type: Number, default: 0 },
    team2Amount: { type: Number, default: 0 },
    scores: { type: Array, default: [0, 0] },
    finalized: { type: Boolean, default: false },
    team1List: { type: Array, default: [] },
    team2List: { type: Array, default: [] },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("match", match);
