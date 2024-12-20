import mongoose from "mongoose";
import adminSchema from './../schemas/admin.js';

const adminModel = new mongoose.model("admin", adminSchema);

export default adminModel;