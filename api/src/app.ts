import express from "express";
import db from "../models";
import router from "./routes/books";

const app = express();

const port = 3001;

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/books", router);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`now listening on port ${port}`);
  });
});
