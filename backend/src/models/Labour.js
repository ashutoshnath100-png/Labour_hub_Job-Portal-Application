import mongoose from "mongoose";

const labourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    skills: [{ type: String, required: true }],
    location: { type: String, required: true },
    price: { type: Number, required: true },
    experience: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
    rate_type: { type: String, default: "Per Day" }
}, { timestamps: true });

export default mongoose.model("Labour", labourSchema);
