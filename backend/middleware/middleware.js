import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const autheinticateToken = async (req, res, next) => {
    let jwt_token
    const authHeader = req.headers["authorization"]
    if (authHeader !== undefined) {
        jwt_token = authHeader.split(" ")[1]
    }
    if (jwt_token === undefined) {
        return res.status(401).json({ error: "Invalid access token" })
    } else {
        jwt.verify(jwt_token, process.env.JWT_SECRET, async (error, payload) => {
            if (error) {
                return res.status(401).json({ error: "Invalid access token" })
            } else {
                req.username = payload;
                next();
            }
        });
    }
};