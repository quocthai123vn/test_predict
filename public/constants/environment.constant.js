"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEST_KEY = exports.CONNECTION_STRING = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8000;
exports.PORT = PORT;
const CONNECTION_STRING = process.env.CONNECTION_STRING ||
    "mongodb+srv://javisngo:nuke2022@cluster0.2n6ntzi.mongodb.net/?retryWrites=true&w=majority";
exports.CONNECTION_STRING = CONNECTION_STRING;
const TEST_KEY = process.env.TEST_KEY || "";
exports.TEST_KEY = TEST_KEY;
