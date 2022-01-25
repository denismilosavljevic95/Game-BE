// src/models/army.ts

import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../instances/sequelize'
import { Battle } from './battle';

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
    strategyID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Strategy',
            key: 'id'
        }
    }
}, {
    tableName: "Army"
});

Battle.hasMany(Army)