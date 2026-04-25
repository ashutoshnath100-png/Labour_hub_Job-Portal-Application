import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { connection } from "../config/db.js";

const normalizeEmail = (email) => (email || "").toLowerCase().trim();

export const employeeRegister = async (req, res) => {
    try {
        const { name, email, phone, location, about, password } = req.body;

        if (!name || !email || !phone || !location || !about || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const db = await connection();
        const employees = db.collection("employees");

        const cleanEmail = normalizeEmail(email);
        const cleanPhone = String(phone).trim();

        const exist = await employees.findOne({
            $or: [{ email: cleanEmail }, { phone: cleanPhone }],
        });

        if (exist) {
            return res.status(409).json({ message: "Email or phone already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const newEmployee = {
            name: String(name).trim(),
            email: cleanEmail,
            phone: cleanPhone,
            location: String(location).trim(),
            about: String(about).trim(),
            password: hashed,
            role: "employee",
            createdAt: new Date(),
        };

        const result = await employees.insertOne(newEmployee);

        return res.status(201).json({
            message: "Employee registered successfully",
            employeeId: result.insertedId,
            role: "employee",
        });
    } catch (err) {
        console.log("employeeRegister error:", err);
        return res.status(500).json({ message: err.message || "Server error" });
    }
};

export const employeeLogin = async (req, res) => {
    try {
        const { email, password } = req.body; 

        if (!email || !password) {
            return res.status(400).json({ message: "Email/Phone and password required" });
        }

        const db = await connection();
        const employees = db.collection("employees");

        const input = String(email).trim();            
        const cleanEmail = input.toLowerCase();        
        const cleanPhone = input;                     

        const user = await employees.findOne({
            $or: [{ email: cleanEmail }, { phone: cleanPhone }],
        });

        if (!user) return res.status(404).json({ message: "Employee not found" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: "Wrong password" });

        const token = jwt.sign(
            { id: user._id, role: "employee" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.json({
            message: "Login successful",
            token,
            role: "employee",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                location: user.location,
            },
        });
    } catch (err) {
        console.log("employeeLogin error:", err);
        return res.status(500).json({ message: err.message || "Server error" });
    }
};
export const getEmployeeDashboardStats = async (req, res) => {
    try {
        const db = await connection();
        const employeeId = new ObjectId(req.user.id);

        const workersContacted = await db
            .collection("hireRequests")
            .countDocuments({ employeeId });

        const rejected = await db
            .collection("hireRequests")
            .countDocuments({ employeeId, status: "rejected" });

        const workersHired = await db
            .collection("hireRequests")
            .countDocuments({ employeeId, status: "accepted" });

        const completedJobs = await db
            .collection("jobs")
            .countDocuments({ employeeId, status: "completed" });

        return res.json({ workersContacted, rejected, workersHired, completedJobs });
    } catch (err) {
        console.log("getEmployeeDashboardStats error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
export const getProfile = async (req, res) => {
    try {
        const db = await connection();

        const employeeId = new ObjectId(req.user.id);

        const user = await db.collection("employees").findOne(
            { _id: employeeId },
            { projection: { password: 0 } } 
        );

        if (!user) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({ user });

    } catch (err) {
        console.log("getProfile error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const db = await connection();
        const employeeId = new ObjectId(req.user.id);

        const { name, phone, location, about } = req.body;

        if (!name && !phone && !location && !about) {
            return res.status(400).json({ message: "Nothing to update" });
        }

        const updateData = {};

        if (name) updateData.name = name.trim();
        if (phone) updateData.phone = String(phone).trim();
        if (location) updateData.location = location.trim();
        if (about) updateData.about = about.trim();

        const result = await db.collection("employees").updateOne(
            { _id: employeeId },
            { $set: updateData }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.json({ message: "Profile updated successfully" });

    } catch (err) {
        console.log("updateProfile error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};