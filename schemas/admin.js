import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  aid: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  aname: {
    type: String,
    trim: true,
    required: true
  },
  assn: {
    type: Number,
    min: 100000000000,
    max: 999999999999,
    required: true
  },
  aphone: {
    type: String,
    trim: true,
    unique: true,
    minLength: 10,
    maxLength: 13,
    required: true
  },
  aemail: {
    type: String,
    trim: true,
    lowercase: true,
    required: false
  },
  apassword: {
    type: String,
    trim: true,
    minLength: 8,
    required: true
  }
});

export default adminSchema;