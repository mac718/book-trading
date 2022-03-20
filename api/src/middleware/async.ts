import { NextFunction, RequestHandler, Request, Response } from "express";

export const asyncWrapper = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

//module.exports = asyncWrapper;
