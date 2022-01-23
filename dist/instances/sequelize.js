"use strict";
// src/instances/sequelize.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const logger_1 = __importDefault(require("../lib/logger"));
exports.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: "mysql",
    port: 3306
});
exports.sequelize.authenticate().then(() => {
    logger_1.default.info('Uspesno authenticate');
})
    .catch(err => {
    logger_1.default.error('ERROR - Unable to connect to the database:' + err);
});
//# sourceMappingURL=sequelize.js.map