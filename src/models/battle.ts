// src/models/battle.ts

import { DataTypes } from 'sequelize'
import { sequelize } from '../instances/sequelize'

export const Battle = sequelize.define("Battle", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
    },
}, {
    tableName: "Battle"
});