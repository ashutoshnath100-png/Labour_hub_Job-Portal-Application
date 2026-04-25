import { connection } from "../config/db.js";
import { ObjectId } from "mongodb";

export const addReview = async (req, res) => {
    try {
        const db = await connection();

        if(!req.user || req.user.role !== "employee") {
            return res.status(403).json({
                message: "Only employees can add reviews"
            });
        }
        const { workerId, rating, comment } = req.body;
        const employerId = new ObjectId(req.user.id);

        const hire = await db.collection("hireRequests").findOne({
            employeeId: employerId,
            labourId: new ObjectId(workerId),
            status: "accepted"
        });

        if (!hire) {
            return res.status(403).json({
                message: "You can only review workers you hired"
            });
        }

        const job = await db.collection("jobs").findOne({
            employeeId: employerId,
            labourId: new ObjectId(workerId),
            status: "completed"
        });

        if (!job) {
            return res.status(403).json({
                message: "You can review only after job completion"
            });
        }

        const existingReview = await db.collection("reviews").findOne({
            workerId: new ObjectId(workerId),
            employerId
        });

        if (existingReview) {
            return res.status(400).json({
                message: "Already reviewed"
            });
        }

        await db.collection("reviews").insertOne({
            workerId: new ObjectId(workerId),
            employerId,
            rating,
            comment,
            createdAt: new Date()
        });

        res.json({ message: "Review added successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error adding review" });
    }
};
export const canReview = async (req, res) => {
    try {
        const db = await connection();

        const employerId = new ObjectId(req.user.id);
        const { workerId } = req.params;

        const job = await db.collection("jobs").findOne({
            employeeId: employerId,
            labourId: new ObjectId(workerId),
            status: "completed"
        });

        if (!job) {
            return res.json({ canReview: false });
        }

        const existingReview = await db.collection("reviews").findOne({
            workerId: new ObjectId(workerId),
            employerId
        });

        if (existingReview) {
            return res.json({ canReview: false });
        }

        return res.json({ canReview: true });

    } catch (err) {
        res.status(500).json({ message: "Error checking review permission" });
    }
};