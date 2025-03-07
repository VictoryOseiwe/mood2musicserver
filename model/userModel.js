import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName:{
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isAlphanumeric: true
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        underscored: true
    }
)