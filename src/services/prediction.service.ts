import { UserModel } from './../models/user.model';
import { PredictionRepository } from "../interfaces/prediction/prediction-repository";
import { Prediction, PredictionModel } from "../models/prediction.model";

export class PredictionService implements PredictionRepository {
  public async create(
    chainId: number,
    epoch: number,
    amount: number,
    position: number,
    userAddress: string
  ): Promise<void> {
    await Promise.all([ 
      PredictionModel.create({
      chainId,
      epoch,
      amount,
      position,
      userAddress,
    }),
    UserModel.updateOne(
      {
        chainId: chainId,
        userAddress: userAddress
      },
      {
        $inc: { totalPrediction: amount }
      }
    )
    ]);
  }

  public async setResult(chainId: number, epoch: number, scores: number[]): Promise<void> {
    const update =
      scores[0] > scores[1]
        ? [{ result: 1 }, { result: 2 }]
        : scores[0] < scores[1]
        ? [{ result: 2 }, { result: 1 }]
        : [{ result: 3 }, { result: 3 }];
    await Promise.all([
      PredictionModel.updateMany({ chainId, epoch, position: 0 }, update[0]),
      PredictionModel.updateMany({ chainId, epoch, position: 1 }, update[1]),
    ]);
  }

  public async claim(chainId: number, epoch: number, userAddress: string, amountReward: number) {
    await Promise.all([
      PredictionModel.updateOne(
        {
          chainId: chainId,
          epoch: epoch,
          userAddress: userAddress,
        },
        { amountReward: amountReward }
      ),
      UserModel.updateOne(
        {
          chainId: chainId,
          userAddress: userAddress
        },
        {
          $inc: { totalReward: amountReward, totalWin: 1 }
        }
      )
    ]);
  }

  public async getUserMatchAmount(chainId: number, userAddress: string): Promise<number> {
    const predictions: Prediction[] = await PredictionModel.find({
      chainId,
      userAddress,
    })
      .select("_id")
      .lean();
    return predictions.length;
  }
}
