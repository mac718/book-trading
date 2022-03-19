import express from "express";
const router = express.Router();
import { createRequest } from "../controllers/requests";
import passport from "passport";

router
  .route("/")
  .post(passport.authenticate("jwt", { session: false }), createRequest);

export default router;
