// src/models/army.ts

import { DataTypes } from 'sequelize'
import { sequelize } from '../instances/sequelize'

export const Army = sequelize.define("Army", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING
    },
    units: {
        type: DataTypes.INTEGER
    },
    battleUnits: {
        type: DataTypes.INTEGER
    },
    battleID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Battle',
            key: 'id'
        }
    },
    StrategyID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Strategy',
            key: 'id'
        }
    }
}, {
    tableName: "Army"
});