import { Request, Response, NextFunction } from "express";
import { checkMatchExistService } from "../services/match.service";
import { STATUS_CODE } from "../constants/status.constant";
import { toObjectId } from "../util/other.util";

const createMatchMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { epoch, matchName, startTime } = req.body;
  if (!epoch) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing epoch" });
  }
  if (!matchName) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing match name" });
  }
  if (!startTime) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing start time" });
  }
  res.locals = {
    epoch,
    matchName,
    startTime,
  };
  return next();
};

const checkMatchIdMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const matchId = req.body.matchId || req.params.matchId || req.query.matchId;
  if (!matchId) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing matchId" });
  }
  const isMatchExist = await checkMatchExistService(toObjectId(matchId));
  if (!isMatchExist) {
    return res
      .status(404)
      .json({ message: STATUS_CODE[404], error: "Match not found" });
  }
  res.locals.matchId = matchId;
  return next();
};

const checkScoreMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const scores = req.body.scores;
  if (!scores) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing scores" });
  }
  if (scores.length !== 2) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Scores invalid" });
  }
  res.locals.scores = scores;
  return next();
};

export { createMatchMiddleware, checkMatchIdMiddleware, checkScoreMiddleware };
