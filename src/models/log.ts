// src/models/log.ts

import { DataTypes } from 'sequelize'
import { sequelize } from '../instances/sequelize'

export const Log = sequelize.define("Log", {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    damage: {
        type: DataTypes.INTEGER
    },
    battleID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Battle',
            key: 'id'
        }
    },
    attactID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Battle',
            key: 'id'
        }
    },
    defenseID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Battle',
            key: 'id'
        }
    }
}, {
    tableName: "Log"
});