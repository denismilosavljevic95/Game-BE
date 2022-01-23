// src/models/status.ts

import { DataTypes } from 'sequelize'
import { sequelize } from '../instances/sequelize'
import { Battle } from './battle';

export const Statuses = sequelize.define("Statuses", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING
    }
}, {
    tableName: "Statuses"
});