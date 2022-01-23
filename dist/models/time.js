"use strict";
// src/models/time.ts
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
exports.Time = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../instances/sequelize");
exports.Time = sequelize_2.sequelize.define("Time", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    userID: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    tableName: "Time"
});
// User.hasMany(Time)
function doStuff() {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = yield exports.Time.findByPk(1, {
            rejectOnEmpty: true,
        });
    });
}
//# sourceMappingURL=time.js.map