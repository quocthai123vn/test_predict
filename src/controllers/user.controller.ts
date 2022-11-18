import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { STATUS_CODE } from "../constants/status.constant";
import { LeaderBoardType } from "../interfaces/user/user.repository";

const service = new UserService();

const loginController = async (req: Request, res: Response) => {
  try {
    const userAddress = res.locals.userAddress;
    const chainId = res.locals.chainId;
    const user = await service.create(userAddress, chainId);
    return res.status(200).json({ message: STATUS_CODE[200], data: user });
  } catch (error) {
    console.log("Login error: ", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

const getUserInfoController = async (req: Request, res: Response) => {
  const userAddress = res.locals.userAddress;
  const chainId = res.locals.chainId;
  try {
    const user = await service.getInfo(userAddress, chainId);
    return res.status(200).json({ message: STATUS_CODE[200], data: user });
  } catch (error) {
    console.log("Login error: ", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

const mostWinLeaderBoardController = async (req: Request, res: Response) => {
  const { limit } = req.query;
  if (!limit) {
    return res
      .status(400)
      .json({ error: "Missing limit", message: STATUS_CODE[400] });
  }
  try {
    const users = await service.getLeaderBoard(
      LeaderBoardType.MOST_WIN,
      +limit
    );
    return res.status(200).json({ message: STATUS_CODE[200], data: users });
  } catch (error) {
    console.log("Leader Board error: ", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

const highRewardLeaderBoardController = async (req: Request, res: Response) => {
  const { limit } = req.query;
  if (!limit) {
    return res
      .status(400)
      .json({ error: "Missing limit", message: STATUS_CODE[400] });
  }
  try {
    const users = await service.getLeaderBoard(
      LeaderBoardType.HIGH_REWARD,
      +limit
    );
    return res.status(200).json({ message: STATUS_CODE[200], data: users });
  } catch (error) {
    console.log("Leader Board error: ", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

const mostLoseLeaderBoardController = async (req: Request, res: Response) => {
  const { limit } = req.query;
  if (!limit) {
    return res
      .status(400)
      .json({ error: "Missing limit", message: STATUS_CODE[400] });
  }
  try {
    const users = await service.getLeaderBoard(
      LeaderBoardType.MOST_LOSE,
      +limit
    );
    return res.status(200).json({ message: STATUS_CODE[200], data: users });
  } catch (error) {
    console.log("Leader Board error: ", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

const highPredictLeaderBoardController = async (
  req: Request,
  res: Response
) => {
  const { limit } = req.query;
  if (!limit) {
    return res
      .status(400)
      .json({ error: "Missing limit", message: STATUS_CODE[400] });
  }
  try {
    const users = await service.getLeaderBoard(
      LeaderBoardType.HIGH_PREDICT,
      +limit
    );
    return res.status(200).json({ message: STATUS_CODE[200], data: users });
  } catch (error) {
    console.log("Leader Board error: ", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

export {
  loginController,
  getUserInfoController,
  mostWinLeaderBoardController,
  highRewardLeaderBoardController,
  highPredictLeaderBoardController,
  mostLoseLeaderBoardController,
};
