import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

export const Mood = sequelize.define(
    'Mood',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        mood: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'moods',
        timestamps: true,
        underscored: true,
        paranoid: true
    }
)