const Sequelize = require("sequelize");
import db from "../models";
const request = require("supertest");
import app from "../src/app";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";

const invalidUser = {
  id: uuidv4(),
  name: "nothing",
  email: "invalid@thing.org",
  password: "hello",
};

describe("user login", () => {
  it("throws an error if db cannot find user", async () => {
    let res = await request(app)
      .post("/api/v1/users/login")
      .set("Content-Type", "application/json")
      .send(invalidUser);

    res = JSON.parse(res.text);

    expect(res.msg).toBe("Something went wrong. Please try again.");
  });
});
