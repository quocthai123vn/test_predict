import { Request, Response, NextFunction } from "express";
import { checkUserExistService } from "../services/user.service";
import { STATUS_CODE } from "../constants/status.constant";

const checkUserAddressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userAddress =
    req.body.userAddress || req.query.userAddress || req.params.userAddress;
  if (!userAddress) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing userAddress" });
  }
  res.locals.userAddress = userAddress.toLowerCase();
  return next();
};

const checkUserExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userAddress = res.locals.userAddress;
  const user = await checkUserExistService(userAddress);
  return user
    ? next()
    : res
        .status(404)
        .json({ message: STATUS_CODE[404], error: "User not found" });
};

export { checkUserAddressMiddleware, checkUserExistMiddleware };
