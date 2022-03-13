import express from "express";
const router = express.Router();
import { addBook, getBooks } from "../controllers/books";

router.route("/all").get(getBooks);
router.route("/").post(addBook);

export default router;
