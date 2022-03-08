import express, { Request, Response, NextFunction } from "express";
import db from "../models";
import { users } from "../seeders/users";
import { v4 as uuidv4 } from "uuid";

const app = express();

const port = 3001;

// const createUser = () => {
//   users.map((user) => {
//     db.User.create(user);
//   });
// };

// createUser();

app.post("/books", (req: Request, res: Response, next: NextFunction) => {
  const book = {
    id: uuidv4(),
    title: "Book",
    author: "Some Guy",
    UserId: "5bc947f6-ffde-49a7-8bca-b8fb29759ac2",
  };
  db.User.Book.create();
  res.send();
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`now listening on port ${port}`);
  });
});
