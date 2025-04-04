import express from "express";
import {
  recommendMusic,
  getPlayListsFromDb,
} from "../controller/playlistController.js";
import { verifyToken } from "../middleware/userAuthMiddleware.js";

const router = express.Router();

router.get("/recommendedplaylist", verifyToken, recommendMusic);
router.get("/getplaylist", verifyToken, getPlayListsFromDb);

export default router;
