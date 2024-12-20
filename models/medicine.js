import mongoose from "mongoose";
import medicineSchema from "../schemas/medicine.js";

const medicineModel = new mongoose.model("medicine", medicineSchema);

export default medicineModel;