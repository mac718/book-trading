import { Request, Response, NextFunction } from "express";

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in error handler");
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.status).json({ msg: err.message });
  // }
  if (err) {
    return res
      .status(500)
      .json({ msg: "Something went wrong. Please try again." });
  }
};

//module.exports = errorHandlerMiddleware;
