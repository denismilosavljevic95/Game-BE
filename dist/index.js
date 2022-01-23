"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = __importDefault(require("./lib/logger"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const time_router_1 = __importDefault(require("./routers/time.router"));
const token_guard_1 = require("./middlewares/token-guard");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// Unprotected Get
app.use('/', user_router_1.default);
app.use((0, token_guard_1.tokenGuard)());
// Protected Get
app.use('/', time_router_1.default);
app.listen(port, () => {
    logger_1.default.info(`App is listening on port ${port}`);
});
//# sourceMappingURL=index.js.map