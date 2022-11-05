import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = new Schema(
  {
    userAddress: { type: String, require: true, lowercase: true, unique: true },
    winNumber: { type: Number, default: 0 },
    loseNumber: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", user);
