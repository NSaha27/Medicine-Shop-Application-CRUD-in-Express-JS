import mongoose from "mongoose";

const dbConnect = mongoose.connect("mongodb://localhost:27017", {dbName: "medicine_shop"});

export default dbConnect;