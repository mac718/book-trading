import { Request, Response, NextFunction } from "express";
import CustomAPIError from "../errors/custom-error";

export const errorHandlerMiddleware = (
  err: Error | CustomAPIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in error handler");
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  if (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong. Please try again." });
  }
};

//module.exports = errorHandlerMiddleware;
