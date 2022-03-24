import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../../models";
import { asyncWrapper } from "../middleware/async";

type User = {
  id: string;
  email: string;
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
  const books: Book[] = await db.Book.findAll({
    include: [
      {
        association: "User",
        attributes: ["name", "location"],
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

  res.status(StatusCodes.OK).json(bookObjs);
};

export const getMultipleBooks: RequestHandler = async (req, res) => {
  const { id } = req.query;

  const books: Book[] = await db.Book.findAll({
    where: { id: id },
    include: [
      {
        association: "User",
        attributes: ["email", "location"],
        required: true,
      },
    ],
  });

  const bookObjs = books.map((book) => {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      user: book.User.name,
      email: book.User.email,

      location: book.User.location,
      userId: book.UserId,
    };
  });

  res.status(StatusCodes.OK).json(bookObjs);
};

export const getCurrentUsersBooks: RequestHandler = async (req, res) => {
  const user = req.user;

  console.log("user", user);

  const books = await db.Book.findAll({ where: { UserId: user.id } });

  res.status(StatusCodes.OK).json(books);
};

export const getUsersBooks: RequestHandler = asyncWrapper(async (req, res) => {
  const { id } = req.query;

  const books = await db.Book.findAll({ where: { UserId: id } });

  res.status(StatusCodes.OK).json(books);
});

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
