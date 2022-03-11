import app from "./src/app";
import db from "./models";

const port = 3001;

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`now listening on port ${port}`);
  });
});
