import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRET_KEY;
export const verifyLabourToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, secretKey);
        if (decoded.role !== "labour") {
            return res.status(403).json({ message: "Access denied" });
        }
        req.labour = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
