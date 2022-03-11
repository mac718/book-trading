import { RequestHandler } from "express";
import sequelize from "sequelize";
import db from "../../models";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

type User = {
  dataValues: {
    id: string;
    name: string;
    location: string;
    bookCount?: number;
  };
};

type DataVlues = {
  id: string;
  name: string;
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
  const { name, location, password } = req.body;
  const id = uuidv4();
  const hash = await bcrypt.hash(password, 10);
  const user = { id, location, name, password: hash };
  await db.User.create(user);
  res.json(user);
};

export const getUsers: RequestHandler = async (req, res) => {
  const users = await db.User.findAll();
  //Promsise.all for parallel processing of db calls
  const usersWithBookCount: DataVlues[] = await Promise.all(
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
