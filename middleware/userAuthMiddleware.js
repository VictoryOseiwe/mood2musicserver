import jwt from "jsonwebtoken"
import env from "dotenv"

env.config()

export const userAuthMiddleware = (req, res, next) =>{
    //Get token from headers
    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({error: 'Access Denied'});
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET)
        req.user = decoded;
        next(); //Proceeds to next middleware/controller
    } catch (error) {
        return res.status(401).json({ message: "Invalid credentials "})
    }
}