import { Request, Response } from "express";
import { createMatchService } from "../services/match.service";
import { STATUS_CODE } from "../constants/status.constant";
import matchModel from "../models/match.model";
import predictionModel from "../models/prediction.model";
import userModel from "../models/user.model";
import { sampleMatch } from "../constants/sample.data";

const resetDataController = async (req: Request, res: Response) => {
  try {
    await Promise.all([
      matchModel.deleteMany({}),
      predictionModel.deleteMany({}),
      userModel.deleteMany({}),
    ]);
    await Promise.all(
      sampleMatch.map((data: any) => {
        createMatchService(data.epoch, data.matchName, data.startTime);
      })
    );
    return res.status(200).json({ message: STATUS_CODE[200] });
  } catch (error) {
    console.log("Reset data error: ", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

export { resetDataController };
