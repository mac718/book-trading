import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../../models";
import { v4 as uuidv4 } from "uuid";

export const createRequest: RequestHandler = async (req, res) => {
  const { requestedBooks, offeredBooks } = req.body;
  const user = req.user;

  const requestedBooksString = requestedBooks.join(",");
  const offeredBooksString = offeredBooks.join(",");

  const newRequest = {
    id: uuidv4(),
    requestedBooks: requestedBooksString,
    offeredBooks: offeredBooksString,
    requester: user.id,
  };

  await db.Request.create(newRequest);
  res.status(StatusCodes.CREATED).send();
};
