import jwt from "jsonwebtoken";
import validator from "validator";
import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import env from "dotenv";

env.config();

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  try {
    // validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    //validate password
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number",
      });
    }

    //check if user is registered already
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      username,
    });

    //Generate JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    //set cookie with JWT token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure it's secure in production
      sameSite: "Strict",
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
    });

    //send response with token
    res.status(200).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logUserIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    //validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    //validate input fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password" });
    }

    //check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid email" });

    //validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    //generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    //set cookie with JWT token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure it's secure in production
      sameSite: "Strict",
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
    });

    //send response with token
    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging user in", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logUserOut = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Cookie expires at the start of the current session
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const workingBackend = (req, res) => {
  res.status(200).json({ message: "API is bafadfasdrunning" });
};
