import express from "express";
const router = express.Router();

import { getUsers, createUser } from "../controllers/user";

router.route("/").post(createUser);
router.route("/all").get(getUsers);

export default router;
