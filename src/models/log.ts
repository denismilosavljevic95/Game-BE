// src/models/log.ts

import { DataTypes } from 'sequelize'
import { sequelize } from '../instances/sequelize'
import { Army } from './army';

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
            model: 'Army',
            key: 'id'
        }
    },
    defenseID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Army',
            key: 'id'
        }
    }
}, {
    tableName: "Log"
});

Log.hasOne(Army, {as: 'Attack', foreignKey : 'id', sourceKey: 'attactID'})
Log.hasOne(Army, {as: 'Defense', foreignKey : 'id', sourceKey: 'defenseID'})