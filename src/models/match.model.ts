import mongoose from "mongoose";

const Schema = mongoose.Schema;

const match = new Schema(
  {
    matchName: { type: String, require: true },
    epoch: { type: String, require: true, unique: true },
    startTime: { type: Number, require: true },
    team1Amount: { type: Number, default: 0 },
    team2Amount: { type: Number, default: 0 },
    scores: { type: Array, default: [0, 0] },
    finalized: { type: Boolean, default: false },
    team1List: { type: Array, default: [] },
    team2List: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("match", match);
