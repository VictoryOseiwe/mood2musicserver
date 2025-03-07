import express from 'express';
import { createUser, logUserIn, logUserOut, workingBackend } from '../controller/userController.js';

const router = express.Router();

// Create a new user
router.post('/register', createUser);

// Log in existing user
router.post('/login', logUserIn);

// Log out current user
router.get('/logout', logUserOut);

//For testing my backend
router.get('/', workingBackend)

export default router;
