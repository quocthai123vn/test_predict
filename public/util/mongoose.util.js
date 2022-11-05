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
exports.queryAndPagination = exports.createNewData = void 0;
const other_util_1 = require("./other.util");
const createNewData = (model, newData) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield model.create(newData);
    yield data.save();
    return data;
});
exports.createNewData = createNewData;
const queryAndPagination = (model, objectQuery, pageId = 1, pageSize = 8, sortObj = { createdAt: -1 }, properties = "") => __awaiter(void 0, void 0, void 0, function* () {
    objectQuery = (0, other_util_1.cleanObject)(objectQuery);
    const currentPage = Number(pageId);
    const totalItems = yield model.countDocuments(objectQuery);
    const totalPages = Math.ceil(totalItems / pageSize);
    const items = 0 < currentPage && currentPage <= totalPages
        ? yield model
            .find(objectQuery, properties)
            .lean()
            .allowDiskUse(true)
            .sort(sortObj)
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize)
        : [];
    return {
        data: items,
        pagination: {
            totalItems,
            pageSize,
            currentPage,
            totalPages,
        },
    };
});
exports.queryAndPagination = queryAndPagination;
