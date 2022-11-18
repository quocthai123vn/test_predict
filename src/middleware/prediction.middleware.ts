import { Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "../constants/status.constant";

const createPredictionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { amount, position, epoch } = req.body;
  if (!amount) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing amount" });
  }
  if (position === undefined) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing position" });
  }
  if (!epoch) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing epoch" });
  }
  res.locals.amount = amount;
  res.locals.position = position;
  res.locals.epoch = epoch;
  return next();
};

const setResultMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { epoch, scores } = req.body;
  if (!epoch) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing epoch" });
  }
  if (!scores || scores.length !== 2) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing scores" });
  }
  res.locals.epoch = epoch;
  res.locals.scores = scores;
  return next();
};

const createClaimMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { epoch, amountReward } = req.body;
  if (!epoch) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing epoch" });
  }
  if (!amountReward) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing amountReward" });
  }
  res.locals.epoch = epoch;
  res.locals.amountReward = amountReward;
  return next();
};

export {
  createPredictionMiddleware,
  setResultMiddleware,
  createClaimMiddleware,
};
