import { RequestHandler } from "express";
import sequelize from "sequelize";
import db from "../../models";

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

export const getUsers: RequestHandler = async (req, res) => {
  const users = await db.User.findAll();
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

  // users.forEach((user: User) => {
  //   db.Book.count({
  //     where: {
  //       UserId: user.dataValues.id,
  //     },
  //   }).then((res: number) => {
  //     user.dataValues = { ...user.dataValues, bookCount: res };
  //     usersWithBookCount.push(user.dataValues);
  //   });
  // });

  console.log(usersWithBookCount);

  res.json(usersWithBookCount);
};
