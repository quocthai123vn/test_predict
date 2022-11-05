"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApp = void 0;
const express_1 = __importDefault(require("express"));
const os_1 = __importDefault(require("os"));
const cors_1 = __importDefault(require("cors"));
const cors_config_1 = require("./cors.config");
const root_routes_1 = __importDefault(require("../routes/root.routes"));
const environment_constant_1 = require("../constants/environment.constant");
process.env.UV_THREADPOOL_SIZE = os_1.default.cpus().length;
const app = (0, express_1.default)();
app.use((0, cors_1.default)(cors_config_1.corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
//Route configuration
app.use("/", root_routes_1.default);
const startApp = () => {
    app.listen(environment_constant_1.PORT, () => {
        console.log(`Server is running at http://localhost:${environment_constant_1.PORT}`);
    });
};
exports.startApp = startApp;
