import { RequestHandler } from "express";
import db from "../../models";

type User = {
  id: string;
  name: string;
  location: string;
};

type Book = {
  title: string;
  author?: string;
  UserId: string;
  User: User;
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

export const addBook: RequestHandler = async (req, res) => {
  const user: User = req.user;
  console.log("user", user.id);

  const { title, author, description } = req.body;

  const book = await db.Book.create({
    title,
    author,
    description,
    UserId: user.id,
  });

  res.status(201).json(book);
};
