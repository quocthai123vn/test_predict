"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanObject = exports.toObjectId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const toObjectId = (id) => {
    const objId = new mongoose_1.default.Types.ObjectId(id);
    return objId;
};
exports.toObjectId = toObjectId;
const cleanObject = (obj) => {
    Object.keys(obj).forEach((key) => obj[key] === undefined ? delete obj[key] : {});
    return obj;
};
exports.cleanObject = cleanObject;
