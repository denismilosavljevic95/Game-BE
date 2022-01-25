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
        type: DataTypes.STRING
    },
    statusID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Statuses',
            key: 'id'
        }
    }
}, {
    tableName: "Battle"
});