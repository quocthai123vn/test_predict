import { createNewData } from "../util/mongoose.util";
import userModel from "../models/user.model";
import { User } from "../interfaces/user.interface";
import { getTotalMatchOfUserService } from "./prediction.service";

const findOneUserService = async (query: any) => {
  const user: User = await userModel.findOne(query).lean();
  return user;
};

const createUserIfNotExistService = async (userAddress: string) => {
  const isExist = await userModel.findOne({ userAddress });
  const user: User = isExist
    ? isExist
    : await createNewData(userModel, { userAddress, nonce: Date.now() });
  return user;
};

const updateUserResultService = async (
  winnerList: string[],
  loserList: string[]
) => {
  await Promise.all([
    userModel.updateMany(
      { userAddress: winnerList },
      { $inc: { winNumber: 1 } }
    ),
    userModel.updateMany(
      { userAddress: loserList },
      { $inc: { loseNumber: 1 } }
    ),
  ]);
};

const getUserInfoService = async (userAddress: string) => {
  const user: User = await userModel.findOne({ userAddress }).lean();
  const total = await getTotalMatchOfUserService(userAddress);
  return {
    userAddress,
    total,
    winRate: user.winNumber / total,
    loseRate: user.loseNumber / total,
  };
};

const checkUserExistService = async (userAddress: string) => {
  const user: User = await userModel
    .findOne({ userAddress })
    .select("_id")
    .lean();
  return user ? true : false;
};

export {
  findOneUserService,
  createUserIfNotExistService,
  updateUserResultService,
  getUserInfoService,
  checkUserExistService,
};
