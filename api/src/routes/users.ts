import express from "express";
const router = express.Router();

import { getUsers, createUser, logIn } from "../controllers/users";

router.route("/").post(createUser);
router.route("/login").post(logIn);
router.route("/all").get(getUsers);

export default router;
