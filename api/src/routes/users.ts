import express from "express";
const router = express.Router();
import { body } from "express-validator";

import { getUsers, createUser, logIn } from "../controllers/users";

router
  .route("/")
  .post(
    body("email").isEmail(),
    body("email").notEmpty(),
    body("password").notEmpty(),
    createUser
  );
router
  .route("/login")
  .post(body("email").notEmpty(), body("password").notEmpty(), logIn);
router.route("/all").get(getUsers);

export default router;
