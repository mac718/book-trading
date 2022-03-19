import express from "express";
const router = express.Router();
import { body, validationResult } from "express-validator";

import { getUsers, createUser, logIn } from "../controllers/users";

router.route("/").post(body("email").isEmail(), createUser);
router.route("/login").post(logIn);
router.route("/all").get(getUsers);

export default router;
