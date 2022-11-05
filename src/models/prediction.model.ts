import mongoose from "mongoose";

const Schema = mongoose.Schema;

const prediction = new Schema(
  {
    matchId: { type: mongoose.Types.ObjectId, require: true },
    userAddress: { type: String, require: true },
    amount: { type: Number, required: true },
    position: { type: Number, required: true },
    result: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("prediction", prediction);
