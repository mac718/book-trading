import { RequestHandler } from "express";
import db from "../../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";
require("dotenv").config();

type User = {
  dataValues: {
    id: string;
    name: string;
    email: string;
    location: string;
    bookCount?: number;
  };
};

type DataValues = {
  id: string;
  name: string;
  email: string;
  location: string;
  bookCount?: number;
};

type Book = {
  title: string;
  author?: string;
  UserId: string;
};

export const createUser: RequestHandler = async (req, res) => {
  console.log(req.body);
  const { name, location, email, password } = req.body;

  const user = await db.User.findAll({ where: { email: email } });

  console.log("user", user);

  if (user.length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "This user already exists." });
  }

  const id = uuidv4();
  const hash = await bcrypt.hash(password, 10);
  const newUser = { id, location, name, email, password: hash };
  await db.User.create(newUser);
  const token = _generateToken(newUser);
  res.status(StatusCodes.CREATED).json({ newUser, token });
};

export const logIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Must provide email and password." });
  }

  let user = await db.User.findAll({ where: { email } });
  user = user[0].dataValues;

  console.log("password", user);

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
};

export const getUsers: RequestHandler = async (req, res) => {
  const users = await db.User.findAll();
  //Promsise.all for parallel processing of db calls
  const usersWithBookCount: DataValues[] = await Promise.all(
    users.map(async (user: User) => {
      let count = await db.Book.count({
        where: {
          UserId: user.dataValues.id,
        },
      });

      user.dataValues = { ...user.dataValues, bookCount: count };
      return user.dataValues;
    })
  );

  res.json(usersWithBookCount);
};

//private

function _generateToken(user: DataValues) {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: 86400 }
  );
  return token;
}
