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
exports.checkUserExistMiddleware = exports.checkUserAddressMiddleware = void 0;
const user_service_1 = require("../services/user.service");
const status_constant_1 = require("../constants/status.constant");
const checkUserAddressMiddleware = (req, res, next) => {
    const userAddress = req.body.userAddress || req.query.userAddress || req.params.userAddress;
    if (!userAddress) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing userAddress" });
    }
    res.locals.userAddress = userAddress.toLowerCase();
    return next();
};
exports.checkUserAddressMiddleware = checkUserAddressMiddleware;
const checkUserExistMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userAddress = res.locals.userAddress;
    const user = yield (0, user_service_1.checkUserExistService)(userAddress);
    return user
        ? next()
        : res
            .status(404)
            .json({ message: status_constant_1.STATUS_CODE[404], error: "User not found" });
});
exports.checkUserExistMiddleware = checkUserExistMiddleware;
