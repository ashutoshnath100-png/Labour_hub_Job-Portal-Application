import express from "express";
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js";
import labourRoutes from "./routes/labourRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import hireRequestRoutes from "./routes/hireRequstRoutes.js";


const app = express();


app.use(cors());
app.use(express.json());


app.get("/api/test", (req, res) => {
    res.json({ message: "Backend connected successfully" });
});


app.use("/admin", adminRouter);
app.use("/api/labour", labourRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/hire", hireRequestRoutes);


export default app;