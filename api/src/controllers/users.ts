import { RequestHandler } from "express";
import db from "../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
const { Op } = require("sequelize");
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";
import { asyncWrapper } from "../middleware/async";
import { BadRequestError } from "../errors/bad-request";
require("dotenv").config();

type User = {
  dataValues: {
    id: string;
    name: string;
    email: string;
    location: string;
    bookCount?: number;
    incomingRequests?: number;
  };
};

type DataValues = {
  id: string;
  name: string;
  email: string;
  location: string;
  bookCount?: number;
  incomingRequests?: number;
};

type Book = {
  title: string;
  author?: string;
  UserId: string;
};

type Request = {
  id: string;
  requestedBooks: string;
  offeredBooks: string;
};

export const createUser: RequestHandler = asyncWrapper(async (req, res) => {
  const { name, location, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    type ValidationErrors = {
      [key: string]: string;
    };
    const validationErrors: ValidationErrors = {};
    errors.array().forEach((err) => {
      validationErrors[err.param] = err.msg;
    });
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: validationErrors });
  }

  const user = await db.User.findAll({ where: { email: email } });

  console.log("smurf", user);

  if (user.length > 0) {
    throw new BadRequestError("This user already exists.");
  }

  const id = uuidv4();
  const hash = await bcrypt.hash(password, 10);
  const newUser = { id, location, name, email, password: hash };
  await db.User.create(newUser);
  const token = _generateToken(newUser);
  res.status(StatusCodes.CREATED).json({ newUser, token });
});

export const logIn: RequestHandler = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors });
  }

  let user = await db.User.findOne({ where: { email } });

  if (!user) {
    throw new BadRequestError("This user does not exist.");
  }
  user = user.dataValues;

  console.log("user", user);

  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "This user does not exist" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const token = _generateToken(user);
    return res.status(StatusCodes.OK).json({ token, user });
  }
});

export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await db.User.findAll();
  //Promsise.all for parallel processing of db calls
  const usersWithBookAndRequestCount: DataValues[] = await Promise.all(
    users.map(async (user: User) => {
      let bookCount = await db.Book.count({
        where: {
          UserId: user.dataValues.id,
        },
      });

      let books = await await db.Book.findAll({
        where: {
          UserId: user.dataValues.id,
        },
        raw: true,
      });

      const allRequestedBooks = await db.Request.findAll({
        attributes: ["requestedBooks"],
        raw: true,
      });

      let reqCount = 0;

      const bookIds = allRequestedBooks.map((r: Request) => r.requestedBooks);

      books.forEach((book: any) => {
        let count = bookIds.filter((id: string) => id === book.id).length;
        reqCount += count;
      });

      user.dataValues = {
        ...user.dataValues,
        bookCount: bookCount,
        incomingRequests: reqCount,
      };
      return user.dataValues;
    })
  );

  res.json(usersWithBookAndRequestCount);
};

export const getUser: RequestHandler = asyncWrapper(async (req, res) => {
  const userEmail = req.query.user;

  const user = await db.User.findOne({ where: { email: userEmail } });

  res.status(StatusCodes.OK).json(user);
});

//private

function _generateToken(user: DataValues) {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: 86400 }
  );
  return token;
}
