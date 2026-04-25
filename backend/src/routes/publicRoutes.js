import express from "express";
import { getHomeStats,getCategoryCounts } from "../controllers/publicController.js";


const router = express.Router();

router.get("/home-stats",getHomeStats);
router.get("/category-counts", getCategoryCounts);

export default router;