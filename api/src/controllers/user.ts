import { RequestHandler } from "express";
import db from "../../models";

export const getUsers: RequestHandler = async (req, res) => {
  const users = await db.User.findAll();
  res.json(users);
};
