import predictionModel from "../models/prediction.model";
import { createNewData } from "../util/mongoose.util";
import { updateMatchService } from "./match.service";
import mongoose, { Types } from "mongoose";
import { Prediction } from "../interfaces/prediction.interface";

const createPredictionService = async (
  matchId: mongoose.Types.ObjectId,
  amount: number,
  position: number,
  userAddress: string
) => {
  await updateMatchService(matchId, position, amount, userAddress);
  const prediction: Prediction = await createNewData(predictionModel, {
    userAddress,
    matchId,
    amount,
    position,
  });
  return prediction;
};

const setPredictionResultService = async (
  matchId: mongoose.Types.ObjectId,
  scores: number[]
) => {
  const update =
    scores[0] > scores[1]
      ? [{ result: 1 }, { result: 2 }]
      : scores[0] < scores[1]
      ? [{ result: 2 }, { result: 1 }]
      : [{ result: 3 }, { result: 3 }];
  await Promise.all([
    predictionModel.updateMany({ matchId, position: 0 }, update[0]),
    predictionModel.updateMany({ matchId, position: 1 }, update[1]),
  ]);
};

const getTotalMatchOfUserService = async (userAddress: string) => {
  const predictions: Prediction[] = await predictionModel
    .find({ userAddress })
    .select("_id")
    .lean();
  return predictions.length;
};

const airdropStatisticService = async () => {
  const epoch = Array.from({ length: 16 }, (_, i) => i + 1);
  const prediction = await predictionModel.find({ epoch });
};

export {
  createPredictionService,
  setPredictionResultService,
  getTotalMatchOfUserService,
};
