import { RequestHandler } from "express";
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

type DataValues = {
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
  const { name, location, email, password } = req.body;

  const user = await db.User.findAll({ where: { email: email } });

  console.log("user", user);

  if (user.length > 0) {
    return res.status(400).json({ msg: "This user already exists." });
  }

  const id = uuidv4();
  const hash = await bcrypt.hash(password, 10);
  const newUser = { id, location, name, email, password: hash };
  await db.User.create(newUser);
  res.json(newUser);
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
