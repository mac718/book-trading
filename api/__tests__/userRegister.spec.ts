const Sequelize = require("sequelize");
import { test } from "../config/config";
import db from "../models";
const request = require("supertest");
import app from "../src/app";
import { v4 as uuidv4 } from "uuid";

// const sequelize = new Sequelize(test.database, test.username, test.password, {
//   dialect: test.dialect,
// });

beforeAll(() => {
  return db.sequelize.sync();
});

// beforeEach(async () => {
//   await db.User.destroy({ truncate: true });
// });

const validUser = {
  id: uuidv4(),
  name: "user1",
  location: "Portland",
  password: "P4assword",
};

const postUser = (user = validUser) => {
  return request(app).post("/api/v1/users").send(user);
};

describe("User Registration", () => {
  it("does stuff", async () => {
    const response = await postUser();
    expect(response.status).toBe(200);
  });
});
