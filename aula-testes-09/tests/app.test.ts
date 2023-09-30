import supertest from "supertest";
import app from "./../src/app";
import prisma from "../src/database";
import { faker } from "@faker-js/faker";
import { UserInput } from "repository";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const user: UserInput = { email: faker.internet.email(), password: faker.internet.password() };
    const { status } = await api.post("/users").send(user);
    expect(status).toBe(201);
  });

  it("should receive 409 when trying to create two users with same e-mail", async () => {
    const user: UserInput = { email: faker.internet.email(), password: faker.internet.password() }
    await api.post("/users").send(user);
    const { status } = await api.post("/users").send(user);
    expect(status).toBe(409);
  });

});

describe("GET /users tests", () => {
  it("should return a single user", async () => {
    // criar o cenário
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    });
    const { status, body } = await api.get(`/users/${user.id}`);
    expect(status).toBe(200);
    expect(body).toEqual(user);
  });

  it("should return 404 when can't find a user by id", async () => {
    const { status } = await api.get("/users/99999999");
    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    });
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    });
    const { status, body } = await api.get("/users");
    expect(status).toBe(200);
    expect(body).toHaveLength(2);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: expect.any(String)
        })
      ]));
  });

})