import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  });

  it("should return 400 when elements query isNaN", async () => {
    const { status } = await api.get("/fibonacci?elements=NaN");
    expect(status).toBe(400);
  });

  it("should return 400 when elements query is not present", async () => {
    const { status } = await api.get("/fibonacci");
    expect(status).toBe(400);
  });

  it("should return 400 when elements query is not a valid number", async () => {
    const { status } = await api.get("/fibonacci?elements=-2");
    expect(status).toBe(400);
  });

  it("should return 200 and a list of n elements", async () => {
    const { status, body } = await api.get("/fibonacci?elements=10");
    expect(status).toBe(200);
    expect(body).toHaveLength(10);
    expect(body).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34])
  });
})