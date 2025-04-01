import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/userModel.js";

dotenv.config();

// export const userAuthMiddleware = (req, res, next) => {
//   // Get token from headers
//   const token = req.headers.authorization?.split(" ")[1];

//   console.log("Received UserAuth Token:", req.headers.authorization); // Debugging line

//   if (!token) {
//     return res.status(401).json({ error: "Access Denied: No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;

//     console.log("Decoded UserAuth User:", req.user); // Debugging line

//     next(); // Proceeds to next middleware/controller
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ message: "Invalid credentials or expired token" });
//   }
// };

// export const verifyToken = async (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.token || req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res
//         .status(401)
//         .json({ error: "Access Denied: No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findByPk(decoded.id);

//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: "Invalid credentials or expired token" });
//     }

//     req.user = user; // Attach user object to request
//     next(); // Pass control to the next middleware/route
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ message: "Invalid credentials or expired token" });
//   }
// };

export const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  console.log("Received Verify Token:", token); // Debugging

  if (!token) {
    return res.status(401).json({ error: "Access Denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded verify Token:", decoded); // Debugging

    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials or expired token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid credentials or expired token" });
  }
};
