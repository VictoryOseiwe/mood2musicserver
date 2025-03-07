import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

export const Playlist = sequelize.define(
    'Playlist',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        mood: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)