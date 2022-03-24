import express from "express";
const router = express.Router();
import {
  addBook,
  getBooks,
  getUsersBooks,
  getMultipleBooks,
} from "../controllers/books";
import passport from "passport";

router.route("/all").get(getBooks);
router.route("/get-multiple").get(getMultipleBooks);
router.route("/user").get(getUsersBooks);
router
  .route("/")
  .post(passport.authenticate("jwt", { session: false }), addBook);

export default router;
