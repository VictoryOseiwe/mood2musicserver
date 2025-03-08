import express from 'express';
import { userAuthMiddleware } from '../middleware/userAuthMiddleware.js'
import { recommendMusic } from '../controller/playlistController.js';

const router = express.Router()

router.get("/recommendedplaylist", userAuthMiddleware, recommendMusic)

export default router