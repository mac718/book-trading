import express from "express";
const router = express.Router();
import { createRequest, getAllRequests } from "../controllers/requests";
import passport from "passport";
import { body } from "express-validator";

router.route("/").get(getAllRequests);

router
  .route("/")
  .post(
    passport.authenticate("jwt", { session: false }),
    body("requestedBooks").notEmpty(),
    body("offeredBooks").notEmpty(),
    createRequest
  );

export default router;
