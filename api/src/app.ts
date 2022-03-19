import express from "express";
import morgan from "morgan";
import cors from "cors";
import books from "./routes/books";
import users from "./routes/users";
import requests from "./routes/requests";
import passportMiddleware from "./middleware/passport";
import passport from "passport";

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(express.static("./public"));
app.use(express.json());

app.use(passport.initialize());
passport.use(passportMiddleware);

app.use("/api/v1/books", books);
app.use("/api/v1/users", users);
app.use("/api/v1/requests", requests);

console.log(process.env.NODE_ENV);

export default app;
