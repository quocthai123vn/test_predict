import { Request, Response } from "express";
import { createPredictionService } from "../services/prediction.service";
import { STATUS_CODE } from "../constants/status.constant";
import { toObjectId } from "../util/other.util";

const createPredictionController = async (req: Request, res: Response) => {
  const { matchId, amount, position, userAddress } = res.locals;
  try {
    const prediction = await createPredictionService(
      toObjectId(matchId),
      amount,
      position,
      userAddress
    );
    return res
      .status(200)
      .json({ message: STATUS_CODE[200], data: prediction });
  } catch (error) {
    console.log("Create prediction error", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

export { createPredictionController };
