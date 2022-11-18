"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPageMiddleware = void 0;
const status_constant_1 = require("../constants/status.constant");
const checkPageMiddleware = (req, res, next) => {
    const { pageId, pageSize } = req.body;
    if (!pageId) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing pageId" });
    }
    if (!pageSize) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "Missing pageSize" });
    }
    if (typeof pageId !== "number") {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "pageId invalid" });
    }
    if (typeof pageSize !== "number") {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "pageSize invalid" });
    }
    if (pageSize > 30) {
        return res
            .status(400)
            .json({ message: status_constant_1.STATUS_CODE[400], error: "pageSize must less than 30" });
    }
    if (pageId > pageSize) {
        return res.status(400).json({
            message: status_constant_1.STATUS_CODE[400],
            error: "pageId must less than pageSize",
        });
    }
    res.locals.pageId = pageId;
    res.locals.pageSize = pageSize;
    return next();
};
exports.checkPageMiddleware = checkPageMiddleware;
