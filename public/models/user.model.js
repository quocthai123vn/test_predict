"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const user = new Schema({
    userAddress: { type: String, require: true, lowercase: true, unique: true },
    winNumber: { type: Number, default: 0 },
    loseNumber: { type: Number, default: 0 },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("user", user);
