import express from "express";
const router = express.Router();
import { addBook, getBooks } from "../controllers/books";
import passport from "passport";

router.route("/all").get(getBooks);
router
  .route("/")
  .post(passport.authenticate("jwt", { session: false }), addBook);

export default router;
