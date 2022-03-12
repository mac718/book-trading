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

beforeEach(async () => {
  await db.User.destroy({ where: {} });
});

const validUser = {
  id: uuidv4(),
  name: "user1",
  location: "Portland",
  email: "user1@mail.com",
  password: "P4assword",
};

const postUser = (user = validUser) => {
  return request(app).post("/api/v1/users").send(user);
};

describe("User Registration", () => {
  it("returns 200 status code when user successfully registers", async () => {
    const response = await postUser();
    console.log("res", response);
    expect(response.status).toBe(200);
  });

  // it("saves user to the database", async () => {
  //   await postUser();
  //   const users = await db.User.findAll();
  //   expect(users.length).toBe(1);
  // });

  // it("returns an error if the user already exists", async () => {
  //   await postUser();
  //   const response = await postUser();
  //   expect(response.status).toBe(400);
  // });
});
