import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// export const userAuthMiddleware = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ error: "Access Denied: No token provided" });
//     }

//     const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach user data to request
//         next(); // Proceed to next middleware/controller
//     } catch (error) {
//         console.error("JWT Verification Error:", error.message);
//         return res.status(401).json({ message: "Invalid or expired token" });
//     }
// };

export const userAuthMiddleware = (req, res, next) => {
    // Get token from headers
    const token = req.headers.authorization?.split(' ')[1];

    console.log("Received Token:", req.headers.authorization); // Debugging line

    if (!token) {
        return res.status(401).json({ error: 'Access Denied: No token provided' });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;

        console.log("Decoded User:", req.user); // Debugging line

        next(); // Proceeds to next middleware/controller
    } catch (error) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
};
