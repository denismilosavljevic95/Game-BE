// src/models/strategy.ts

import { DataTypes } from 'sequelize'
import { sequelize } from '../instances/sequelize'

export const Strategy = sequelize.define("Strategy", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    tableName: "Strategy"
});