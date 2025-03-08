import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";
import { User } from "./userModel.js";

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
            allowNull: false,
            references: {
                model: "users", // Table name, not the model variable
                key: "id",
            },
            onDelete: "CASCADE"
        },
        mood: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "playlists",
        timestamps: true,
        underscored: true,
        paranoid: true
    }
)