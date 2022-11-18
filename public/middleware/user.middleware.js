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
exports.checkUserAddressMiddleware = void 0;
const user_service_1 = require("../services/user.service");
const service = new user_service_1.UserService();
const checkUserAddressMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userAddress = req.body.userAddress || req.query.userAddress || req.params.userAddress;
    const chainId = req.body.chainId || req.query.chainId || req.params.chainId;
    if (userAddress) {
        yield service.create(userAddress, chainId);
    }
    res.locals.userAddress = userAddress.toLowerCase();
    res.locals.chainId = chainId;
    return next();
});
exports.checkUserAddressMiddleware = checkUserAddressMiddleware;
