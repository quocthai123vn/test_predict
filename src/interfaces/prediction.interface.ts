import mongoose from "mongoose";

export interface Prediction {
  matchId: mongoose.Types.ObjectId;
  userAddress: string;
  amount: number;
  position: number;
  result: number;
}
