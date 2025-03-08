import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import authRoute from "./route/authRoute.js"
import moodRoute from './route/moodRoute.js'
import playlistRoute from './route/playlistRoute.js'
import { sequelize } from './config/dbConfig.js';

env.config();

const app = express();
const PORT = process.env.PORT || 5000
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
import './model/association.js'

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("Database connected successfully.");
    })
    .catch((err) => {
        console.error("Error connecting to the database: ", err);
        process.exit(1);
    })

app.use("/user", authRoute)
app.use('/user', moodRoute)
app.use('/user', playlistRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port http:localhost:${PORT}`);
})