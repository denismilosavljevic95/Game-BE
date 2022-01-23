"use strict";
// src/routers/time.router.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../services/user.service");
const timeRouter = (0, express_1.Router)();
const userService = new user_service_1.UserService();
timeRouter.get('/time', [], (req, res) => {
    return res.status(200).json({ "key": "value" });
});
timeRouter.post('/time', [], (req, res) => {
    return res.status(200).json({ "key": "value" });
});
timeRouter.patch('/time', [], (req, res) => {
    return res.status(200).json({ "key": "value" });
});
exports.default = timeRouter;
//# sourceMappingURL=time.router.js.map