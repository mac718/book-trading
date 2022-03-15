import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../../models";

type User = {
  id: string;
  name: string;
  location: string;
};

type Book = {
  id: string;
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
      id: book.id,
      title: book.title,
      author: book.author,
      user: book.User.name,
      location: book.User.location,
      userId: book.UserId,
    };
  });

  res.json(bookObjs);
};

export const getCurrentUsersBooks: RequestHandler = async (req, res) => {
  const user = req.user;

  const books = await db.Book.findAll({ where: { UserId: user.id } });

  res.status(StatusCodes.OK).json(books);
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
