import express from "express";
import {
  createUser,
  logUserIn,
  logUserOut,
  workingBackend,
} from "../controller/userController.js";
import { verifyToken } from "../middleware/userAuthMiddleware.js";

const router = express.Router();

// Create a new user
router.post("/register", createUser);

// Log in existing user
router.post("/login", logUserIn);

// Log out current user
router.get("/logout", logUserOut);

//For testing my backend
router.get("/", workingBackend);

// Protected routes
router.get("/me", verifyToken, (req, res) => {
  res.json({
    message: "Access to protected route",
    user: req.user,
  });
});

export default router;
