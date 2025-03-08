import express from 'express';
import { userAuthMiddleware } from '../middleware/userAuthMiddleware.js'
import { addMood, getMoods } from '../controller/moodController.js';

const router = express.Router()

router.post('/addmood', userAuthMiddleware, addMood)
router.get('/getmood', userAuthMiddleware, getMoods)

export default router