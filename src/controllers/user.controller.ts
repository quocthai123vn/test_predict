import { Request, Response } from "express";
import { STATUS_CODE } from "../constants/status.constant";
import {
  createUserIfNotExistService,
  getUserInfoService,
} from "../services/user.service";

const loginController = async (req: Request, res: Response) => {
  try {
    const userAddress = res.locals.userAddress;
    const user = await createUserIfNotExistService(userAddress);
    return res.status(200).json({ message: STATUS_CODE[200], data: user });
  } catch (error) {
    console.log("Login error: ", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

const getUserInfoController = async (req: Request, res: Response) => {
  const userAddress = res.locals.userAddress;
  try {
    const user = await getUserInfoService(userAddress);
    return res.status(200).json({ message: STATUS_CODE[200], data: user });
  } catch (error) {
    console.log("Login error: ", error);
    return res.status(500).json({ message: STATUS_CODE[500] });
  }
};

export { loginController, getUserInfoController };
