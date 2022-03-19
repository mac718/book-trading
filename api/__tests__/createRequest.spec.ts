const Sequelize = require("sequelize");
import db from "../models";
const request = require("supertest");
import app from "../src/app";
import { v4 as uuidv4 } from "uuid";

beforeAll(() => {
  return db.sequelize.sync();
});

beforeEach(async () => {
  await db.Request.destroy({ where: {} });
  await db.User.destroy({ where: {} });
});

const validRequest = {
  id: uuidv4(),
  requestedBooks: [1, 2, 3, 4],
  offeredBooks: [5, 6, 7, 8],
  requester: uuidv4(),
};

const validUser = {
  id: uuidv4(),
  name: "user1",
  location: "Portland",
  email: "user1@mail.com",
  password: "P4assword",
};

describe("createRequest", () => {
  it("should return 201 status code upon successful creation", async () => {
    const user = await request(app).post("/api/v1/users").send(validUser);

    console.log("wjwdjnojdcn", JSON.parse(user.text));

    const res = JSON.parse(user.text);

    const response = await request(app)
      .post("/api/v1/requests")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${res.token}`)
      .send(validRequest);

    expect(response.status).toBe(201);
  });
});
