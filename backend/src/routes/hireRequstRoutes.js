import express from "express";
import {
    createHireRequest,
    getHireStats,
    getPendingHireRequests,
    getEmployeeHiredWorkers,
    updateHireRequestStatus,
    getLabourAllRequests,
    getEmployeeCompletedJobs,
    getEmployeeRejectedRequests,
    getEmployeeContactedWorkers,
} from "../controllers/hireRequestController.js";
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();


router.get("/employee/hired", protect, getEmployeeHiredWorkers);
router.post("/create", protect, createHireRequest);
router.get("/stats", protect, getHireStats);
router.get("/pending", protect, getPendingHireRequests);
router.get("/labour/requests", protect, getLabourAllRequests);
router.patch("/:id/status", protect, updateHireRequestStatus);
router.get("/employee/completed", protect, getEmployeeCompletedJobs);
router.get("/employee/rejected", protect, getEmployeeRejectedRequests);
router.get("/employee/contacted", protect, getEmployeeContactedWorkers);

export default router;

