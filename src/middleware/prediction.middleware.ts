import { Request, Response, NextFunction } from "express";
import { STATUS_CODE } from "../constants/status.constant";

const createPredictionMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { amount, position } = req.body;
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
  res.locals.amount = amount;
  res.locals.position = position;
  return next();
};

export { createPredictionMiddleware };
