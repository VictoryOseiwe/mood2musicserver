import express from "express";
import { recommendMusic } from "../controller/playlistController.js";
import { verifyToken } from "../middleware/userAuthMiddleware.js";

const router = express.Router();

router.get("/recommendedplaylist", verifyToken, recommendMusic);

export default router;
