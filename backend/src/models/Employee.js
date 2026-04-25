import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        location: String,
        password: String,
    },
    { timestamps: true }
);


export default mongoose.model("Employee", employeeSchema);