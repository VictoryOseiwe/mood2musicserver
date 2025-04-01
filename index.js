import express from "express";
import cors from "cors";
import env from "dotenv";
import authRoute from "./route/authRoute.js";
import moodRoute from "./route/moodRoute.js";
import playlistRoute from "./route/playlistRoute.js";
import { sequelize } from "./config/dbConfig.js";
import cookieParser from "cookie-parser";

env.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // allow methods other than GET for cross-origin requests
    allowedHeaders: ["Content-Type", "Authorization"], // allow headers other than Content-Type for cross-origin requests
  })
);
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
import "./model/association.js";

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.error("Error connecting to the database: ", err);
    process.exit(1);
  });

app.use("/user", authRoute);
app.use("/mood", moodRoute);
app.use("/playlist", playlistRoute);

// app.get("/user/me", (req, res) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ message: "Not authenticated" });

//   try {
//     const decoded = jwt.verify(token, "your_secret_key");
//     res.json({ userId: decoded.userId });
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
