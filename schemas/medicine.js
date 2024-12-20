import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  mbno: {
    type: String,
    trim: true,
    unique: true,
    maxLength: 8,
    required: true
  },
  mname: {
    type: String,
    trim: true,
    required: true
  },
  mmanufacturer: {
    type: String,
    trim: true,
    required: true
  },
  mprice: {
    type: Number,
    required: true
  },
  mqty: {
    type: Number,
    required: true
  }
});

export default medicineSchema;