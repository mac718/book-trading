import express from "express";
import morgan from "morgan";
import cors from "cors";
import db from "../models";
import books from "./routes/books";
import users from "./routes/users";

const app = express();

const port = 3001;

app.use(morgan("dev"));
app.use(cors());

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/books", books);
app.use("/api/v1/users", users);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`now listening on port ${port}`);
  });
});
