import { Request, Response, NextFunction } from "express";
import { TEST_KEY } from "../constants/environment.constant";
import { STATUS_CODE } from "../constants/status.constant";

const checkPageMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pageId, pageSize } = req.body;
  if (!pageId) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing pageId" });
  }
  if (!pageSize) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "Missing pageSize" });
  }
  if (typeof pageId !== "number") {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "pageId invalid" });
  }
  if (typeof pageSize !== "number") {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "pageSize invalid" });
  }
  if (pageSize > 30) {
    return res
      .status(400)
      .json({ message: STATUS_CODE[400], error: "pageSize must less than 30" });
  }
  if (pageId > pageSize) {
    return res.status(400).json({
      message: STATUS_CODE[400],
      error: "pageId must less than pageSize",
    });
  }
  res.locals.pageId = pageId;
  res.locals.pageSize = pageSize;
  return next();
};

const checkTestKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const testKey = req.query.testKey;
  if (!testKey) {
    return res.status(400).json({ message: STATUS_CODE[400] });
  }
  if (testKey !== TEST_KEY) {
    return res.status(400).json({ message: STATUS_CODE[400] });
  }
  return next();
};

export { checkPageMiddleware, checkTestKeyMiddleware };
