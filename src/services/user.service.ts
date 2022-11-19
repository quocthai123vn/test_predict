import { UserInfoResponse } from "../interfaces/user/user-info.response";
import { UserModel } from "../models/user.model";
import { User } from "../models/user.model";
import {
  LeaderBoardType,
  UserRepository,
} from "../interfaces/user/user.repository";
import { PredictionService } from "./prediction.service";

export class UserService implements UserRepository {
  public async getLeaderBoard(
    type: LeaderBoardType,
    limit: number
  ): Promise<User[]> {
    const query: any =
      type === LeaderBoardType.HIGH_PREDICT
        ? { totalPrediction: -1 }
        : type === LeaderBoardType.HIGH_REWARD
        ? { totalReward: -1 }
        : type === LeaderBoardType.MOST_WIN
        ? { totalWin: -1 }
        : { totalLose: -1 };

    const users = await UserModel.aggregate([
      {
        $project: {
          chainId: "$chainId",
          userAddress: "$userAddress",
          totalWin: "$totalWin",
          totalPrediction: "$totalPrediction",
          amountPrediction: "$amountPrediction",
          totalReward: "$totalReward",
          totalLose: {
            $subtract: ["$totalPrediction", "$totalWin"],
          },
        },
      },
      {
        $limit: limit,
      },
      {
        $sort: query,
      },
    ]);

    return users;
  }

  public async findOne(userAddress: string, chainId: number): Promise<User> {
    const user: User = await UserModel.findOne({ userAddress, chainId }).lean();
    return user;
  }

  public async create(userAddress: string, chainId: number): Promise<User> {
    const isExist = await UserModel.findOne({ userAddress, chainId });
    const user: User = isExist
      ? isExist
      : await UserModel.create({ userAddress, chainId });
    return user;
  }

  public async getInfo(
    userAddress: string,
    chainId: number
  ): Promise<UserInfoResponse> {
    const user: User = await this.findOne(userAddress, chainId);
    const predictionService = new PredictionService();
    const total = await predictionService.getUserMatchAmount(
      chainId,
      userAddress
    );
    return {
      userAddress,
      total,
      winRate: user.totalWin ? user.totalWin / total : 0,
      loseRate: user.totalWin ? (total - user.totalWin) / total : 0,
    };
  }

  public async isExist(userAddress: string, chainId: number): Promise<boolean> {
    const user: User = await UserModel.findOne({ userAddress, chainId })
      .select("_id")
      .lean();
    return user ? true : false;
  }
}
