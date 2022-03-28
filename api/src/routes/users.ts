import express from "express";
const router = express.Router();
import { body } from "express-validator";

import {
  getAllUsers,
  createUser,
  logIn,
  getUser,
  updateUser,
} from "../controllers/users";
import passport from "passport";

router
  .route("/")
  .post(
    body("email").isEmail(),
    body("email").notEmpty().withMessage("Must enter email."),
    body("password").notEmpty().withMessage("Must enter password."),
    createUser
  );
router
  .route("/login")
  .post(body("email").notEmpty(), body("password").notEmpty(), logIn);
router.route("/all").get(getAllUsers);
router.route("/user").get(getUser);
router
  .route("/user")
  .patch(passport.authenticate("jwt", { session: false }), updateUser);

export default router;
