import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


const adminSecretKey = process.env.SECRET_KEY;
const userSecretKey = process.env.JWT_SECRET;


export const verifyAdminToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;


        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Token missing" });
        }


        const token = authHeader.split(" ")[1];


        if (!adminSecretKey) {
            return res.status(500).json({ success: false, message: "SECRET_KEY not set" });
        }


        const decoded = jwt.verify(token, adminSecretKey);


        req.admin = decoded;


        next();
    } catch (err) {
        console.log("verifyAdminToken error:", err?.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};


export const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;


        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Token missing" });
        }


        const token = authHeader.split(" ")[1];


        if (!userSecretKey) {
            return res.status(500).json({ success: false, message: "JWT_SECRET not set" });
        }


        const decoded = jwt.verify(token, userSecretKey);
        req.user = {
            ...decoded,
            id: decoded.id || decoded._id,
            role: decoded.role || "user",
        };


        if (!req.user.id) {
            return res.status(401).json({ success: false, message: "Invalid token payload (id missing)" });
        }


        next();
    } catch (err) {
        console.log("protect error:", err?.message);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};