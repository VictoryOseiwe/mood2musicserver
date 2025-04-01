import express from "express";
import { addMood, getMoods } from "../controller/moodController.js";
import { verifyToken } from "../middleware/userAuthMiddleware.js";

const router = express.Router();

router.post("/addmood", verifyToken, addMood);
router.get("/getmood", verifyToken, getMoods);

export default router;
