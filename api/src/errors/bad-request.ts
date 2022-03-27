import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-error";

export class BadRequestError extends CustomAPIError {
  constructor(message: string, statusCode: number = 500) {
    super(message, statusCode);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
