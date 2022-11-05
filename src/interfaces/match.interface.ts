import mongoose from "mongoose";

export interface Match {
  _id: mongoose.Types.ObjectId;
  matchName: string;
  epoch: string;
  startTime: number;
  team1Amount: number;
  team2Amount: number;
  scores: number[];
  finalized: boolean;
  team1List: string[];
  team2List: string[];
}
