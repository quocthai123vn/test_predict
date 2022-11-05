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
exports.getUserInfoController = exports.loginController = void 0;
const status_constant_1 = require("../constants/status.constant");
const user_service_1 = require("../services/user.service");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAddress = res.locals.userAddress;
        const user = yield (0, user_service_1.createUserIfNotExistService)(userAddress);
        return res.status(200).json({ message: status_constant_1.STATUS_CODE[200], data: user });
    }
    catch (error) {
        console.log("Login error: ", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.loginController = loginController;
const getUserInfoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userAddress = res.locals.userAddress;
    try {
        const user = yield (0, user_service_1.getUserInfoService)(userAddress);
        return res.status(200).json({ message: status_constant_1.STATUS_CODE[200], data: user });
    }
    catch (error) {
        console.log("Login error: ", error);
        return res.status(500).json({ message: status_constant_1.STATUS_CODE[500] });
    }
});
exports.getUserInfoController = getUserInfoController;
