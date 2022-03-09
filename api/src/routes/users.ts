import express from "express";
const router = express.Router();

import { getUsers } from "../controllers/user";

router.route("/all").get(getUsers);

export default router;
