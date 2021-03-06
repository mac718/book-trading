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
  await db.Request.destroy({ where: {} });
  await db.User.destroy({ where: {} });
});

const validRequest = {
  id: uuidv4(),
  requestedBooks: JSON.stringify([1, 2, 3, 4]),
  offeredBooks: JSON.stringify([5, 6, 7, 8]),
  requester: uuidv4(),
};

const invalidRequestMissingRequestedBooks = {
  id: uuidv4(),
  requestedBooks: null,
  offeredBooks: JSON.stringify([5, 6, 7, 8]),
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

    const res = JSON.parse(user.text);

    const response = await request(app)
      .post("/api/v1/requests")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${res.token}`)
      .send(validRequest);

    expect(response.status).toBe(201);
  });

  it("should add a request to the database", async () => {
    const user = await request(app).post("/api/v1/users").send(validUser);

    const res = JSON.parse(user.text);

    const response = await request(app)
      .post("/api/v1/requests")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${res.token}`)
      .send(validRequest);

    const requests = await db.Request.findAll();

    expect(requests.length).toBe(1);
  });

  it("returns a 400 status if requestedBooks is missing", async () => {
    const user = await request(app).post("/api/v1/users").send(validUser);

    const res = JSON.parse(user.text);

    const response = await request(app)
      .post("/api/v1/requests")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${res.token}`)
      .send(invalidRequestMissingRequestedBooks);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });
});
