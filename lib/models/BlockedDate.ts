import mongoose from "mongoose";

const BlockedDateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  reason: {
    type: String,
    default: "ADMIN_BLOCK",
  },
}, { timestamps: true });

export default mongoose.models.BlockedDate ||
  mongoose.model("BlockedDate", BlockedDateSchema);
