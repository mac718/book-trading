import express from "express";
const router = express.Router();
import { getBooks } from "../controllers/books";

router.route("/all").get(getBooks);

export default router;
