"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const prediction = new Schema({
    matchId: { type: mongoose_1.default.Types.ObjectId, require: true },
    userAddress: { type: String, require: true },
    amount: { type: Number, required: true },
    position: { type: Number, required: true },
    result: { type: Number, default: 0 },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("prediction", prediction);
