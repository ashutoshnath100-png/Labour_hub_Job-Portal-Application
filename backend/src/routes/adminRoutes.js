import express from "express";
import {
    adminLogin, resetPasswordDirect, verifyForgotPassword,
    getAdminProfile, updateAdminProfile, changeAdminPassword,
    googleAdminLogin, recentRegistrations, getAllUsers, updateUserStatus,
    getLabourVerification,
    getDashboardStats,
    getSingleUser,
    updateUserProfileStatus,
    exportPDFData,
    exportCSVData,
    getReportsData,
    sendReminder,
    sendWarning,
    blockLabour,
    blockAllInactive,
    getReminderCooldown,
    getWarningCooldown,
    getBlockCooldown,
    
} from "../controllers/adminController.js";
import { verifyAdminToken } from "../middlewares/authMiddleware.js";


const adminRouter = express.Router();


adminRouter.post("/login", adminLogin);
adminRouter.post("/google-login", googleAdminLogin);
adminRouter.post("/verify-forgot-password", verifyForgotPassword);
adminRouter.post("/reset-password-direct", resetPasswordDirect);
adminRouter.get("/dashboard", verifyAdminToken, (req, resp) => {
    resp.send({
        success: true,
        message: "Welcome to Admin Dashboard",
        admin: req.admin,
    })
})


adminRouter.get("/users", verifyAdminToken, (req, resp) => {
    resp.send({
        success: true,
        message: "Users fetched successfully",
    })
})


adminRouter.get("/labours", verifyAdminToken, (req, resp) => {
    resp.send({
        success: true,
        message: "Labours fetched successfully",
    })
})


adminRouter.get("/profile", verifyAdminToken, getAdminProfile);
adminRouter.put("/profile", verifyAdminToken, updateAdminProfile);
adminRouter.put("/change-password", verifyAdminToken, changeAdminPassword);
adminRouter.get("/recent-users", verifyAdminToken, recentRegistrations);
adminRouter.get("/all-users", verifyAdminToken, getAllUsers);
adminRouter.put("/all-users/:id/status", verifyAdminToken, updateUserStatus);
adminRouter.get("/labour-verification",verifyAdminToken,getLabourVerification);
adminRouter.post("/send-reminder-bulk",verifyAdminToken,sendReminder);
adminRouter.post("/send-warning-bulk",verifyAdminToken,sendWarning);
adminRouter.put("/block-labour/:id",verifyAdminToken,blockLabour);
adminRouter.put("/block-all-inactive",verifyAdminToken,blockAllInactive);
adminRouter.get("/dashboard-stats",verifyAdminToken,getDashboardStats);
adminRouter.get("/user/:id", verifyAdminToken, getSingleUser);
adminRouter.put("/all-user/:id/status", verifyAdminToken, updateUserProfileStatus);
adminRouter.get("/reports", verifyAdminToken, getReportsData);
adminRouter.get("/reports/exports-csv", verifyAdminToken, exportCSVData);
adminRouter.get("/reports/exports-pdf", verifyAdminToken, exportPDFData);
adminRouter.get("/reminder-cooldown", verifyAdminToken, getReminderCooldown);
adminRouter.get("/warning-cooldown", verifyAdminToken, getWarningCooldown);
adminRouter.get("/block-cooldown", verifyAdminToken, getBlockCooldown);



export default adminRouter;