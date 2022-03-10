import { RequestHandler } from "express";
import db from "../../models";

type Book = {
  title: string;
  author?: string;
  UserId: string;
  User: User;
};

type User = {
  id: string;
  name: string;
  location: string;
};

export const getBooks: RequestHandler = async (req, res) => {
  console.log("in handler");
  const books: Book[] = await db.Book.findAll({
    include: [
      {
        association: "User",
        attributes: ["name"],
        required: true,
      },
    ],
  });

  const bookObjs = books.map((book) => {
    console.log(book.User);
    return {
      title: book.title,
      author: book.author,
      user: book.User.name,
      location: book.User.location,
      userId: book.UserId,
    };
  });

  res.json(bookObjs);
};
