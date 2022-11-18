"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_constant_1 = require("../constants/environment.constant");
const connectDatabase = () => {
    return new Promise((resolve, reject) => {
        if (!environment_constant_1.CONNECTION_STRING) {
            reject(console.log("Missing connection string"));
        }
        try {
            mongoose_1.default.connect(environment_constant_1.CONNECTION_STRING, () => {
                resolve(console.log("Connected database successfully"));
            });
        }
        catch (error) {
            reject(console.log(error));
        }
    });
};
exports.connectDatabase = connectDatabase;
