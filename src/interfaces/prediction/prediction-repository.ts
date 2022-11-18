import { Prediction } from "../../models/prediction.model";

export interface PredictionRepository {
  create(
    chainId: number,
    epoch: number,
    amount: number,
    position: number,
    userAddress: string
  ): Promise<void>;
  setResult(chainId: number, epoch: number, scores: number[]): Promise<void>;
  getUserMatchAmount(chainId: number, userAddress: string): Promise<number>;
  claim(chainId: number, epoch: number, userAddress: string, amountReward: number): Promise<void>;
}
