import express from "express";
const router = express.Router();
import { createRequest } from "../controllers/requests";
import passport from "passport";
import { body } from "express-validator";

router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    body("requestedBooks").notEmpty(),
    createRequest
  );

export default router;
