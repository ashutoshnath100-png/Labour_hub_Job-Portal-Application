import { connection } from "../config/db.js";

export const getCategoryCounts = async (req, res) => {
    try {
        const db = await connection();

        const rows = await db.collection("labour").aggregate([
            { $unwind: "$skills" },
            { $group: { _id: "$skills", count: { $sum: 1 } } },
            { $project: { _id: 0, skill: "$_id", count: 1 } }
        ]).toArray();

        const result = {};
        for (const r of rows) {
            if (r.skill) result[r.skill] = r.count;
        }

        return res.json({ counts: result });
    } catch (e) {
        return res.status(500).json({ message: "Server error" });
    }
};
export const getHomeStats = async (req, res) => {
    try {
        const db = await connection();
        const verifiedWorkers = await db.collection("labour").countDocuments();

        const successfulJobs = await db.collection("jobs").countDocuments({status: "completed"});

        const cities = await db.collection("labour").distinct("location");

        const citiesCovered = cities.filter(Boolean).length;

        const avgArr = await db.collection("labour").aggregate([{$group: {_id: null, avgRating:{$avg:"$rating"}}},]).toArray();

        const userRating = Number((avgArr?.[0]?.avgRating||0).toFixed(1));
        return res.json({
            verifiedWorkers,
            successfulJobs,
            citiesCovered,
            userRating,
        });
    } catch (e){
        return res.status(500).json({message:"Server error"});
    }
};