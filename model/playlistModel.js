import { sequelize } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

export const Playlist = sequelize.define(
    "Playlist",
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
            onDelete: "CASCADE",
        },
        mood: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        playlist_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        playlist_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        playlist_image: {
            type: DataTypes.STRING,
            allowNull: true, // Can be null if no image is available
        },
    },
    {
        tableName: "playlists",
        timestamps: true,
        underscored: true,
        paranoid: true,
    }
);
