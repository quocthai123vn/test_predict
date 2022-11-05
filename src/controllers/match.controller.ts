import { Request, Response } from "express";
import { toObjectId } from "../util/other.util";
import { STATUS_CODE } from "../constants/status.constant";
import {
  crawlAirdropService,
  createMatchService,
  finalizedMatchService,
  queryMatchService,
} from "../services/match.service";
import { MATCH_STATUS } from "../constants/default.constant";

const createMatchController = async (req: Request, res: Response) => {
  const { epoch, matchName, startTime } = res.locals;
  try {
    const match = await createMatchService(epoch, matchName, startTime);
    return res.status(200).json({ message: STATUS_CODE[200], data: match });
  } catch (error) {
    console.log("Create match controller: ", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

const finalizedMatchController = async (req: Request, res: Response) => {
  const { matchId, scores } = res.locals;
  try {
    await finalizedMatchService(toObjectId(matchId), scores);
    return res.status(200).json({ message: STATUS_CODE[200] });
  } catch (error) {
    console.log("Finalize match error: ", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

const getMatchStatusController = (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .json({ message: STATUS_CODE[200], data: MATCH_STATUS });
  } catch (error) {
    console.log("Get match status error", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

const queryMatchController = async (req: Request, res: Response) => {
  const { matchName, status, latest, pageId, pageSize } = res.locals;
  try {
    const matches = await queryMatchService(
      matchName,
      status,
      latest,
      pageId,
      pageSize
    );
    return res.status(200).json({ message: STATUS_CODE[200], matches });
  } catch (error) {
    console.log("Query match error: ", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

const crawlAirdropController = async (req: Request, res: Response) => {
  try {
    const data = await crawlAirdropService();
    return res.status(200).json({ data });
  } catch (error) {
    console.log("Crawl airdrop error: ", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

export {
  createMatchController,
  finalizedMatchController,
  getMatchStatusController,
  queryMatchController,
  crawlAirdropController,
};
