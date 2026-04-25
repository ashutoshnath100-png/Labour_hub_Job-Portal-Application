import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connection } from "../config/db.js";


export const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.status(400).json({ message: "identifier and password required" });
        }


        const db = await connection();


        const admin = await db.collection("admin").findOne({ email: identifier });
        if (admin) {
            const ok = await bcrypt.compare(password, admin.password);
            if (!ok) return res.status(401).json({ message: "Invalid password" });


            const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "7d" });
            return res.json({ token, role: "admin", user: { email: admin.email, name: admin.name } });
        }


        const labour = await db.collection("labour").findOne({
            $or: [{ phone: identifier }, { email: identifier }],
        });


        if (labour) {
            const ok = await bcrypt.compare(password, labour.password);
            if (!ok) return res.status(401).json({ message: "Invalid password" });


            const token = jwt.sign({ id: labour._id, role: "labour" }, process.env.JWT_SECRET, { expiresIn: "7d" });
            delete labour.password;
            return res.json({ token, role: "labour", user: labour });
        }


        return res.status(404).json({ message: "User not found" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

