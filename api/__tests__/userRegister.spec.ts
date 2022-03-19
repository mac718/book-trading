const Sequelize = require("sequelize");
import db from "../models";
const request = require("supertest");
import app from "../src/app";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";

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

const invalidEmailUser = {
  id: uuidv4(),
  name: "user1",
  location: "Portland",
  email: "user1",
  password: "P4assword",
};

const postUser = (user = validUser) => {
  return request(app).post("/api/v1/users").send(user);
};

describe("User Registration", () => {
  it("returns 201 status code when user successfully registers", async () => {
    const response = await postUser();
    console.log("respernse", response.token);
    expect(response.status).toBe(201);
  });

  it("saves user to the database", async () => {
    await postUser();
    const users = await db.User.findAll();
    expect(users.length).toBe(1);
  });

  it("returns an error if the user already exists", async () => {
    await postUser();
    const response = await postUser();
    expect(response.status).toBe(400);
  });

  it("generates a json web token upon successful creation", async () => {
    const response = await postUser();
    const text = JSON.parse(response.text);

    expect(text.token).toBeDefined();
  });

  it("returns 400 status if email is not correct format", async () => {
    const response = await postUser(invalidEmailUser);
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });
});
