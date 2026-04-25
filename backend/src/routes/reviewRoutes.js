import express from "express";
import { addReview, canReview } from "../controllers/reviewController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addReview);
router.get("/can-review/:workerId", protect, canReview);
export default router;