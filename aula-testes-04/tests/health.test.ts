import app from "app";
import supertest from "supertest";

const server = supertest(app);

describe("api tests", () => {
    it("GET /health", async () => {
        // servidor funcionando (express)
        // requisição (supertest)
        const result = await server.get("/health");
        console.log(result);

        // validação (jest)
        const { statusCode } = result;
        expect(statusCode).toEqual(200);
    });
});