import { ObjectId } from "mongodb";
import { connection } from "../config/db.js";

const autoRejectExpiredRequests = async (db) => {
    const now = new Date();

    await db.collection("hireRequests").updateMany(
        {
            status: "pending",
            expiresAt: { $lte: now },
        },
        {
            $set: {
                status: "timed_out",
                updatedAt: now,
                rejectReason: "Auto rejected after 12 hours",
            },
        }
    );
};
export const getEmployeeRejectedRequests = async (req, res) => {
    try {
        const db = await connection();
        await autoRejectExpiredRequests(db);
        const employeeId = new ObjectId(req.user.id);

        const rejected = await db.collection("hireRequests").aggregate([
            { $match: { employeeId, status: "rejected" } },

            {
                $lookup: {
                    from: "labour",
                    localField: "labourId",
                    foreignField: "_id",
                    as: "labour",
                },
            },
            { $unwind: { path: "$labour", preserveNullAndEmptyArrays: true } },

            {
                $project: {
                    status: 1,
                    message: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    expiresAt: 1,
                    rejectsReason: 1,
                    labour: {
                        _id: "$labour._id",
                        name: "$labour.name",
                        phone: "$labour.phone",
                        profession: "$labour.profession",
                        location: "$labour.location",
                        rating: "$labour.rating",
                    },
                },
            },

            { $sort: { updatedAt: -1 } },
        ]).toArray();

        return res.json({ data: rejected });
    } catch (err) {
        console.log("getEmployeeRejectedRequests error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
export const getLabourAllRequests = async (req, res) => {
    try {
        const db = await connection();
        await autoRejectExpiredRequests(db);
        const labourId = new ObjectId(req.user.id);

        const requests = await db
            .collection("hireRequests")
            .aggregate([
                { $match: { labourId } },
                {
                    $lookup: {
                        from: "employees",
                        localField: "employeeId",
                        foreignField: "_id",
                        as: "employee",
                    },
                },
                { $unwind: { path: "$employee", preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        status: 1,
                        message: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        employee: {
                            _id: "$employee._id",
                            name: "$employee.name",
                            email: "$employee.email",
                            phone: "$employee.phone",
                            location: "$employee.location",
                        },
                    },
                },
                { $sort: { createdAt: -1 } },
            ])
            .toArray();


        return res.json({ requests });
    } catch (err) {
        console.log("getLabourAllRequests error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
export const getEmployeeHiredWorkers = async (req, res) => {
    try {
        const db = await connection();
        await autoRejectExpiredRequests(db);

        const employeeId = new ObjectId(req.user.id);


        const hired = await db.collection("hireRequests").aggregate([
            { $match: { employeeId, status: "accepted" } },
            {
                $lookup: {
                    from: "labour",
                    localField: "labourId",
                    foreignField: "_id",
                    as: "labour",
                },
            },
            { $unwind: { path: "$labour", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 1,
                    status: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    message: 1,
                    labour: {
                        _id: "$labour._id",
                        name: "$labour.name",
                        phone: "$labour.phone",
                        location: "$labour.location",
                        profession: "$labour.profession",
                        rating: "$labour.rating",
                        available: "$labour.available",
                    },
                },
            },
            { $sort: { updatedAt: -1 } },
        ]).toArray();


        return res.json({ hired });
    } catch (err) {
        console.log("getEmployeeHiredWorkers error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};


export const getHireStats = async (req, res) => {
    try {
        const db = await connection();
        const labourId = new ObjectId(req.user.id);
        await autoRejectExpiredRequests(db);

        const rows = await db.collection("hireRequests").aggregate([
            { $match: { labourId } },
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]).toArray();


        const stats = { pending: 0, accepted: 0,rejected: 0, timed_out: 0 };


        for (const r of rows) {
            if (r._id === "pending") stats.pending = r.count;
            if (r._id === "accepted") stats.accepted = r.count;
            if (r._id === "rejected") stats.rejected = r.count;
            if (r._id === "timed_out") stats.timed_out = r.count;
        }


        return res.json({
            pending: stats.pending,
            accepted: stats.accepted,
            rejected: stats.rejected,
            timed_out: stats.timed_out,
            totalRequests: stats.pending + stats.accepted + stats.rejected + stats.timed_out
        });
    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};


export const createHireRequest = async (req, res) => {
    try {
        const db = await connection();


        const employeeId = req.user?.id;
        const { labourId, message } = req.body;


        if (!labourId) return res.status(400).json({ message: "labourId required" });
        if (!employeeId) return res.status(401).json({ message: "Unauthorized" });


        const labourObjectId = new ObjectId(labourId);
        const employeeObjectId = new ObjectId(employeeId);


        const alreadyPending = await db.collection("hireRequests").findOne({
            labourId: labourObjectId,
            employeeId: employeeObjectId,
            status: "pending",
        });


        if (alreadyPending) {
            return res.status(409).json({
                message: "Request already sent. Please wait for worker response.",
            });
        }


        const now = new Date();
        const expiresAt = new Date(now.getTime() + 12 * 60 * 60 * 1000);

        const doc = {
            labourId: labourObjectId,
            employeeId: employeeObjectId,
            message: message || "",
            status: "pending",
            createdAt: now,
            updatedAt: now,
            expiresAt,
        };

        await db.collection("hireRequests").insertOne(doc);


        return res.status(201).json({ message: "Hire request sent", request: doc });
    } catch (err) {
        console.log("createHireRequest error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
export const getPendingHireRequests = async (req, res) => {
    try {
        const db = await connection();
        await autoRejectExpiredRequests(db);

        const labourId = req.user?.id;
        if (!labourId) {
            return res.status(401).json({ message: "Unauthorized (token missing)" });
        }


        const requests = await db
            .collection("hireRequests")
            .aggregate([
                { $match: { labourId: new ObjectId(labourId), status: "pending" } },
                {
                    $lookup: {
                        from: "employees",
                        localField: "employeeId",
                        foreignField: "_id",
                        as: "employee",
                    },
                },
                { $unwind: { path: "$employee", preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        status: 1,
                        message: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        employee: {
                            _id: "$employee._id",
                            name: "$employee.name",
                            email: "$employee.email",
                            phone: "$employee.phone",
                            location: "$employee.location",
                        },
                    },
                },
                { $sort: { createdAt: -1 } },
            ])
            .toArray();


        return res.json({ requests });
    } catch (err) {
        console.log("getPendingHireRequests error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};


export const updateHireRequestStatus = async (req, res) => {
    try {
        const db = await connection();
        const { status } = req.body;

        if (!["accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const requestId = new ObjectId(req.params.id);

        const hireReq = await db.collection("hireRequests").findOne({ _id: requestId });
        if (!hireReq) return res.status(404).json({ message: "Request not found" });

        if (hireReq.labourId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        const now = new Date();

        if (hireReq.status !== "pending") {
            return res.status(400).json({ message: "Request already processed" });
        }

        if (hireReq.expiresAt && new Date(hireReq.expiresAt) <= now) {
            await db.collection("hireRequests").updateOne(
                { _id: requestId },
                {
                    $set: {
                        status: "timed_out",
                        updatedAt: now,
                        rejectReason: "Auto rejected after 12 hours",
                    },
                }
            );

            return res.status(400).json({ message: "Request expired and auto rejected" });
        }

        await db.collection("hireRequests").updateOne(
            { _id: requestId },
            { $set: { status, updatedAt: new Date() } }
        );

        if (status === "accepted") {
            const startTime = new Date(now);
            startTime.setHours(10, 0, 0, 0);

            const endTime = new Date(now);
            endTime.setHours(20, 0, 0, 0);

            if (now.getTime() > endTime.getTime()) {
                startTime.setDate(startTime.getDate() + 1);
                endTime.setDate(endTime.getDate() + 1);
            }

            const labourDoc = await db.collection("labour").findOne({ _id: hireReq.labourId });

            const amount = Number(labourDoc?.price || 0);
            const work = labourDoc?.profession || labourDoc?.skills?.[0] || "Work";
            const location = labourDoc?.location || "";

            const month = startTime.toLocaleString("en-US", { month: "short" });

            await db.collection("jobs").insertOne({
                labourId: hireReq.labourId,
                employeeId: hireReq.employeeId,
                requestId: hireReq._id,
                status: "pending",
                startTime,
                endTime,
                work,
                location,
                amount,
                month,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            await db.collection("labour").updateOne(
                { _id: new ObjectId(req.user.id) },
                { $set: { available: false, updatedAt: new Date() } }
            );
        }

        return res.json({ message: "Status updated", status });
    } catch (err) {
        console.log("updateHireRequestStatus error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
export const getEmployeeCompletedJobs = async (req, res) => {
    try {
        const db = await connection();
        await autoRejectExpiredRequests(db);
        const employeeId = new ObjectId(req.user.id);

        const jobs = await db.collection("jobs").aggregate([
            { $match: { employeeId, status: "completed" } },

            {
                $lookup: {
                    from: "labour",
                    localField: "labourId",
                    foreignField: "_id",
                    as: "labour",
                },
            },
            { $unwind: { path: "$labour", preserveNullAndEmptyArrays: true } },

            {
                $project: {
                    status: 1,
                    updatedAt: 1,
                    createdAt: 1,
                    amount: 1,
                    work: 1,
                    location: 1,
                    startTime: 1,
                    endTime: 1,

                    labour: {
                        _id: "$labour._id",
                        name: "$labour.name",
                        phone: "$labour.phone",
                        profession: "$labour.profession",
                        rating: "$labour.rating",
                        location: "$labour.location",
                        city: "$labour.city",
                    },
                },
            },

            { $sort: { updatedAt: -1 } },
        ]).toArray();

        return res.json({ data: jobs });
    } catch (err) {
        console.log("getEmployeeCompletedJobs error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
export const getEmployeeContactedWorkers = async (req, res) => {
    try {
        const db = await connection();
        await autoRejectExpiredRequests(db);
        const employeeId = new ObjectId(req.user.id);

        const data = await db.collection("hireRequests").aggregate([
            { $match: { employeeId } },
            {
                $lookup: {
                    from: "labour",
                    localField: "labourId",
                    foreignField: "_id",
                    as: "labour",
                },
            },
            { $unwind: { path: "$labour", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    status: 1,
                    createdAt: 1,
                    labour: {
                        _id: "$labour._id",
                        name: "$labour.name",
                        phone: "$labour.phone",
                        location: "$labour.location",
                        profession: "$labour.profession",
                        available: "$labour.available",
                    },
                },
            },
            { $sort: { createdAt: -1 } },
        ]).toArray();

        res.json({ data });
    } catch (e) {
        res.status(500).json({ message: "Server error" });
    }
};