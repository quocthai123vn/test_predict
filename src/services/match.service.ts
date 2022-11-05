import mongoose from "mongoose";
import { Match } from "../interfaces/match.interface";
import { MATCH_STATUS } from "../constants/default.constant";
import matchModel from "../models/match.model";
import { createNewData, queryAndPagination } from "../util/mongoose.util";
import { setPredictionResultService } from "./prediction.service";
import { updateUserResultService } from "./user.service";
import { sampleMatch } from "../constants/sample.data";
import predictionModel from "../models/prediction.model";
import userModel from "../models/user.model";

const createMatchService = async (
  epoch: string,
  matchName: string,
  startTime: number
) => {
  const match = createNewData(matchModel, { matchName, epoch, startTime });
  return match;
};

const updateMatchService = async (
  matchId: mongoose.Types.ObjectId,
  position: number,
  amount: number,
  userAddress: string
) => {
  const update =
    position === 0
      ? { $inc: { team1Amount: amount }, $push: { team1List: userAddress } }
      : { $inc: { team2Amount: amount }, $push: { team2List: userAddress } };
  await matchModel.updateOne(
    {
      _id: matchId,
    },
    update
  );
};

const finalizedMatchService = async (
  matchId: mongoose.Types.ObjectId,
  scores: number[]
) => {
  const match: Match = await matchModel.findOne({ _id: matchId }).lean();
  await Promise.all([
    setPredictionResultService(matchId, scores),
    matchModel.updateOne({ _id: matchId }, { scores, finalized: true }),
    scores[0] > scores[1]
      ? updateUserResultService(match.team1List, match.team2List)
      : scores[1] > scores[0]
      ? updateUserResultService(match.team2List, match.team1List)
      : {},
  ]);
};

const checkMatchExistService = async (matchId: mongoose.Types.ObjectId) => {
  const match = await matchModel.findOne({ _id: matchId }).select("_id").lean();
  return match ? true : false;
};

const queryMatchService = async (
  matchName = undefined,
  status = 0,
  latest = true,
  pageId: number,
  pageSize: number
) => {
  const query =
    status === 0
      ? {}
      : status === 1
      ? {
          startTime: { $lt: Date.now() },
        }
      : status === 1
      ? { startTime: { $gte: Date.now() }, finalized: false }
      : { finalized: true };
  const sort = latest ? { createdAt: -1 } : { createdAt: 1 };

  const matches = await queryAndPagination(
    matchModel,
    { ...query, matchName },
    pageId,
    pageSize,
    sort
  );
  const formatData = [];
  for (let i = 0; i < matches.data.length; i++) {
    formatData.push(formatMatchService(matches.data[i]));
  }
  matches.data = formatData;
  return matches;
};

const formatMatchService = ({
  _id,
  matchName,
  epoch,
  startTime,
  team1Amount,
  team2Amount,
  scores,
  finalized,
}: any) => {
  const status = finalized
    ? MATCH_STATUS[3]
    : startTime > Date.now()
    ? MATCH_STATUS[1]
    : MATCH_STATUS[2];
  return {
    _id,
    matchName,
    epoch,
    startTime,
    team1Amount,
    team2Amount,
    scores,
    ratio: team1Amount / team2Amount,
    status,
    totals: team1Amount + team2Amount,
  };
};

const crawlAirdropService = async () => {
  const epochs = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const matches: Match[] = await matchModel.find({ epoch: epochs });
  const users = new Set();

  matches.map((match: Match) => {
    match.team1List.map((user: string) => {
      users.add(user);
    });
    match.team2List.map((user: string) => {
      users.add(user);
    });
  });

  const data = Array.from(users);
  return data;
};

export {
  createMatchService,
  updateMatchService,
  finalizedMatchService,
  checkMatchExistService,
  queryMatchService,
  formatMatchService,
  crawlAirdropService,
};
