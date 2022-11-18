"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MATCH_STATUS = exports.PREDICT_RESULT = void 0;
const PREDICT_RESULT = {
    0: "Waiting for result",
    1: "Win",
    2: "Lose",
    3: "draw",
};
exports.PREDICT_RESULT = PREDICT_RESULT;
const MATCH_STATUS = {
    1: "Waiting",
    2: "Happening",
    3: "Finished",
};
exports.MATCH_STATUS = MATCH_STATUS;
