import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { STATUS_CODE } from "../constants/status.constant";

const service = new UserService();

const checkUserAddressMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userAddress =
    req.body.userAddress || req.query.userAddress || req.params.userAddress;
  const chainId = req.body.chainId || req.query.chainId || req.params.chainId;

  if (userAddress) {
    await service.create(userAddress, chainId);
  }
  res.locals.userAddress = userAddress.toLowerCase();
  res.locals.chainId = chainId;
  return next();
};

export { checkUserAddressMiddleware };
