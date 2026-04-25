import express from "express";
import { connection } from "../config/db.js";
import { ObjectId } from "mongodb";
import {
    getDashboardStats,
    getLabourProfile,
    registerLabour,
    loginLabour,
    updateAvailability,
    updateLabourProfile,
} from "../controllers/labourController.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();
router.post("/register", registerLabour);
router.post("/login", loginLabour);
router.get("/profile", protect, getLabourProfile);
router.put("/profile", protect, updateLabourProfile);
router.patch("/profile", protect, updateLabourProfile);
router.patch("/availability", protect, updateAvailability);
router.get("/jobs", protect, async (req, res) => {
    try {
        const db = await connection();
        const labourId = new ObjectId(req.user.id);

        const now = new Date();

        await db.collection("jobs").updateMany(
            { labourId, status: "pending", endTime: { $lte: now } },
            { $set: { status: "completed", updatedAt: now } }
        );

        const stillPending = await db.collection("jobs").countDocuments({
            labourId,
            status: "pending",
        });

        if (stillPending === 0) {
            await db.collection("labour").updateOne(
                { _id: labourId },
                { $set: { available: true, updatedAt: now } }
            );
        }
        const jobs = await db
            .collection("jobs")
            .find({ labourId })
            .toArray();


        const completedJobs = jobs.filter((j) => j.status === "completed");
        const pendingJobs = jobs.filter((j) => j.status === "pending");
        const rejectedJobs = jobs.filter((j) => j.status === "rejected");


        return res.json({ completedJobs, pendingJobs, rejectedJobs });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.get("/dashboard", protect, getDashboardStats);
router.get("/", async (req, res) => {
    try {
        const db = await connection();
        const labours = await db.collection("labour").find({}).toArray();


        const safeLabours = labours.map((l) => {
            const { password, ...rest } = l;
            return rest;
        });


        return res.json(safeLabours);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.get("/:id", async (req, res) => {
    try {
        const db = await connection();


        const labour = await db.collection("labour").findOne({
            _id: new ObjectId(req.params.id),
        });


        if (!labour) return res.status(404).json({ message: "Labour not found" });


        const { password, ...safeLabour } = labour;
        return res.json(safeLabour);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/:id/review", async (req, res) => {
    try {
        const db = await connection();
        const { rating, comment, name } = req.body;


        const labourId = req.params.id;


        const labour = await db.collection("labour").findOne({
            _id: new ObjectId(labourId),
        });


        if (!labour) {
            return res.status(404).json({ message: "Labour not found" });
        }


        const reviews = labour.reviews || [];


        reviews.push({
            rating: Number(rating),
            comment: comment || "",
            name: name || "Anonymous",
            createdAt: new Date(),
        });


        const avgRating =
            reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) /
            reviews.length;


        await db.collection("labour").updateOne(
            { _id: new ObjectId(labourId) },
            {
                $set: {
                    reviews,
                    rating: Number(avgRating.toFixed(1)),
                },
            }
        );


        return res.json({
            message: "Review added",
            rating: Number(avgRating.toFixed(1)),
            reviews,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add review" });
    }
});


export default router;
