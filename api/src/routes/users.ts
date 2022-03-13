import express from "express";
const router = express.Router();

import { getUsers, createUser, signIn } from "../controllers/users";

router.route("/").post(createUser);
router.route("/signin").post(signIn);
router.route("/all").get(getUsers);

export default router;
