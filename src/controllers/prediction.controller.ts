import { Request, Response } from "express";
import { STATUS_CODE } from "../constants/status.constant";
import { PredictionService } from "../services/prediction.service";

const service = new PredictionService();

const createPredictionController = async (req: Request, res: Response) => {
  const { chainId, epoch, amount, position, userAddress } = res.locals;
  try {
    await service.create(
      chainId,
      epoch,
      amount,
      position,
      userAddress
    );
    return res
      .status(200)
      .json({ message: STATUS_CODE[200], data: "Predict successfully" });
  } catch (error) {
    console.log("Create prediction error", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

const setResultController = async (req: Request, res: Response) => {
  const { chainId, epoch, scores } = res.locals;
  try {
    await service.setResult(chainId, epoch, scores);
    return res
      .status(200)
      .json({ message: STATUS_CODE[200], data: "Set result success" });
  } catch (error) {
    console.log("Set Result error", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

const createClaimController = async (req: Request, res: Response) => {
  const { chainId, epoch, userAddress, amountReward } = res.locals;
  try {
    await service.claim(chainId, epoch, userAddress, amountReward);
    return res
      .status(200)
      .json({ message: STATUS_CODE[200], data: "successful claim" });
  } catch (error) {
    console.log("Create prediction error", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

export {
  createPredictionController,
  createClaimController,
  setResultController,
};
