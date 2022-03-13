import db from "../../models";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
require("dotenv").config();

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default new Strategy(options, async (payload, done) => {
  console.log("payload", payload);
  try {
    const user = await db.User.findAll({
      raw: true,
      where: { id: payload.id },
    });

    if (user[0]) {
      return done(null, user[0]);
    }
    return done(null, false);
  } catch (err) {
    console.log(err);
  }
});
