import express from "express";
import {
    employeeRegister,
    employeeLogin,
    getEmployeeDashboardStats,
    getProfile,
    updateProfile,
} from "../controllers/employeeController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/register", employeeRegister);
router.post("/login", employeeLogin);
router.get("/dashboard", protect, getEmployeeDashboardStats);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
export default router;