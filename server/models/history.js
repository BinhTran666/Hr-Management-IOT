import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    employeeId: {
      type: Number, // Change type to Number
      required: true,
    },
    checkInTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const History = mongoose.model("History", historySchema);