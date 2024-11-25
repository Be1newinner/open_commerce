import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
}, { timestamps: true });


export const User = model("User", userSchema);