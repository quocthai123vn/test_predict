import { User } from "../../models/user.model";
import { UserInfoResponse } from "./user-info.response";

export enum LeaderBoardType {
  MOST_WIN = "Most Win",
  MOST_LOSE = "Most Lose",
  HIGH_PREDICT = "High Predict",
  HIGH_REWARD = "High Reward",
}

export interface UserRepository {
  findOne(userAddress: string, chainId: number): Promise<User>;
  create(userAddress: string, chainId: number): Promise<User>;
  getInfo(userAddress: string, chainId: number): Promise<UserInfoResponse>;
  isExist(userAddress: string, chainId: number): Promise<boolean>;
  getLeaderBoard(type: LeaderBoardType, limit: number): Promise<User[]>;
}
