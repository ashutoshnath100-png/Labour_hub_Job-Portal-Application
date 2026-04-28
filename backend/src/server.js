// import express from "express";
// import { connection as connectDB } from "./config/db.js";
// import adminRouter from "./routes/adminRoutes.js";
// import labourRoutes from "./routes/labourRoutes.js";
// import hireRequestRoutes from "./routes/hireRequstRoutes.js";
// import cors from "cors";
// import dotenv from "dotenv";
// import employeeRoutes from "./routes/employeeRoutes.js";
// import publicRoutes from "./routes/publicRoutes.js";
// import reviewRouter from "./routes/reviewRoutes.js";

// dotenv.config();


// const app = express();


// app.use(express.json());
// app.use(cors());


// app.use("/admin", adminRouter);
// app.use("/api/labour", labourRoutes);
// app.use("/api/employees", employeeRoutes);
// app.use("/api/hire", hireRequestRoutes);
// app.use("/api", publicRoutes);
// app.use("/api/reviews", reviewRouter);

// await connectDB();


// const PORT = process.env.PORT || 4000;


// app.listen(PORT, () => {
//     console.log(`server is running on port ${PORT}`);
// });


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

app.use(cors({
  origin: "*",
  credentials: true
}));

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/admin", adminRouter);
app.use("/api/labour", labourRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/hire", hireRequestRoutes);
app.use("/api", publicRoutes);
app.use("/api/reviews", reviewRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).send({ success: false, message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ success: false, message: "Something went wrong" });
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();