import bcrypt from "bcryptjs";
import { connection } from "../config/db.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";


export const registerLabour = async (req, res) => {
    try {
        const db = await connection();
        console.log("BODY DATA:", req.body);
        const {
            name,
            about,
            phone,
            password,
            email,
            skills,
            location,
            price,
            experience,
            gender,
            rateType,
        } = req.body;


        if (!name || !email || !phone || !password) {
            return res
                .status(400)
                .json({ message: "Name, email, phone, password required" });
        }


        const exist = await db.collection("labour").findOne({
            $or: [{ email }, { phone }],
        });


        if (exist) {
            return res
                .status(409)
                .json({ message: "Email or phone already exists" });
        }


        const newLabour = {
            name: name || "",
            about: about || "",
            phone: phone || "",
            password: await bcrypt.hash(password, 10),
            email: email || "",
            skills: Array.isArray(skills) ? skills : [],
            location: location || "",
            price: Number(price) || 0,
            rate_type: rateType || "Per Day",


            experience: Number(experience) || 0,
            gender: gender || "",


            role: "labour",


            available: true,
            reviews: [],
            createdAt: new Date(),
        };


        await db.collection("labour").insertOne(newLabour);


        return res.status(201).json({
            message: "Registered successfully",
            role: "labour",
        });
    } catch (error) {
        console.log("registerLabour error:", error);
        return res.status(500).json({ message: error.message });
    }
};


export const loginLabour = async (req, res) => {
    try {
        const { identifier, password } = req.body;


        if (!identifier || !password) {
            return res
                .status(400)
                .json({ message: "Identifier and password required" });
        }


        const db = await connection();


        const labour = await db.collection("labour").findOne({
            $or: [{ phone: identifier }, { email: identifier }],
        });


        if (!labour) {
            return res.status(404).json({ message: "Labour not found" });
        }


        const isMatch = await bcrypt.compare(password, labour.password);


        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }


        const role = labour.role || "labour";


        const token = jwt.sign(
            { id: labour._id, role },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "7d" }
        );


        const { password: _, ...safeLabour } = labour;


        return res.json({
            message: "Login successful",
            token,
            role,
            labour: safeLabour,
        });
    } catch (error) {
        console.log("loginLabour error:", error);
        return res.status(500).json({ message: error.message });
    }
};
export const labourDashboardStats = async (req, res) => {
    try {
        const db = await connection();


        const labourId = req.user.id;


        const contacted = await db.collection("hireRequests").countDocuments({
            labourId: new ObjectId(labourId)
        });


        const hired = await db.collection("hireRequests").countDocuments({
            labourId: new ObjectId(labourId),
            status: "accepted"
        });


        const active = await db.collection("hireRequests").countDocuments({
            labourId: new ObjectId(labourId),
            status: "pending"
        });


        res.json({
            workersContacted: contacted,
            activeSearches: active,
            workersHired: hired
        });


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};
export const getAllLabours = async (req, res) => {
    try {
        const db = await connection();
        const labours = await db.collection("labour").find().toArray();


        const safe = labours.map((l) => {
            const { password, ...rest } = l;
            return rest;
        });


        return res.json(safe);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getLabourProfile = async (req, res) => {
    try {
        const db = await connection();

        const labourId = new ObjectId(req.user.id);

        const labour = await db.collection("labour").findOne({
            _id: labourId,
        });

        if (!labour) {
            return res.status(404).json({ message: "Labour not found" });
        }

        const reviews = await db.collection("reviews").find({
            workerId: labourId
        }).toArray();

        const reviewCount = reviews.length;

        const avgRating =
            reviewCount === 0
                ? 0
                : reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
                reviewCount;

        const { password, ...safeLabour } = labour;

        return res.json({
            ...safeLabour,
            rating: Number(avgRating.toFixed(1)),
            reviewCount,
            reviews  
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const updateLabourProfile = async (req, res) => {
    try {
        const db = await connection();


        const labourId = new ObjectId(req.user.id);


        const {
            name,
            phone,
            experience,
            price,
            location,
            about,
            skills,
            rate_type,
        } = req.body;


        const updateDoc = {
            ...(name !== undefined && { name }),
            ...(phone !== undefined && { phone }),
            ...(experience !== undefined && { experience: Number(experience) || 0 }),
            ...(price !== undefined && { price: Number(price) || 0 }),
            ...(location !== undefined && { location }),
            ...(about !== undefined && { about }),
            ...(skills !== undefined && { skills: Array.isArray(skills) ? skills : [] }),
            ...(rate_type !== undefined && { rate_type: rate_type }),
            updatedAt: new Date(),
        };


        await db.collection("labour").updateOne(
            { _id: labourId },
            { $set: updateDoc }
        );


        const updated = await db.collection("labour").findOne({ _id: labourId });
        if (!updated) return res.status(404).json({ message: "Labour not found" });


        const { password, ...safe } = updated;
        return res.json({ message: "Profile updated", labour: safe });
    } catch (err) {
        console.log("updateLabourProfile error:", err);
        return res.status(500).json({ message: err.message });
    }
};
export const updateAvailability = async (req, res) => {
    try {
        const db = await connection();
        const { available } = req.body;


        await db.collection("labour").updateOne(
            { _id: new ObjectId(req.user.id) },
            { $set: { available: !!available } }
        );


        return res.json({ message: "Availability updated", available: !!available });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


export const getDashboardStats = async (req, res) => {
    try {
        const db = await connection();
        const labours = await db.collection("labour").find().toArray();


        const workersContacted = labours.length;
        const activeSearches = labours.filter((l) => l.available).length;
        const workersHired = labours.filter((l) => !l.available).length;


        return res.json({ workersContacted, activeSearches, workersHired });
    } catch (err) {
        return res.status(500).json({ message: "Failed to get dashboard stats" });
    }
};