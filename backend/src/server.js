import express from "express";
import { connection as connectDB } from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import labourRoutes from "./routes/labourRoutes.js";
import hireRequestRoutes from "./routes/hireRequstRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from "./routes/employeeRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";

dotenv.config();


const app = express();


app.use(express.json());
app.use(cors());


app.use("/admin", adminRouter);
app.use("/api/labour", labourRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/hire", hireRequestRoutes);
app.use("/api", publicRoutes);
app.use("/api/reviews", reviewRouter);

await connectDB();


const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

