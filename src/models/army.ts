// src/models/army.ts

import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../instances/sequelize'

// export interface ArmyViewModel {
//     id: number
//     name: string,
//     units: string,
//     battleUnits: number,
//     battleID: number,
//     strategyID: number
// }

// interface ArmyAttributes {
//     id: number
//     name: string,
//     units: string,
//     battleUnits: number,
//     battleID: number,
//     strategyID: number
//   }
// export interface ArmyCreationAttributes extends Optional<ArmyAttributes, "id"> {}
// interface ArmyInstance
// extends Model<ArmyAttributes, ArmyCreationAttributes>,
// ArmyAttributes {}

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