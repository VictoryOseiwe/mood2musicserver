import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import { User } from "./userModel.js";

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
            allowNull: false,
            references: {
                model: "users", // Table name, not the model variable
                key: "id",
            },
            onDelete: "CASCADE",
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