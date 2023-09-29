import app from "app";
import supertest from "supertest";

const server = supertest(app);

describe("GET /health tests", () => {
    it("should return status 200 and response OK! at /health", async () => {
        // servidor funcionando (express)
        // requisição (supertest)
        const result = await server.get("/health");
        console.log(result);

        // validação (jest)
        const { statusCode, text } = result;
        expect(statusCode).toEqual(200);
        expect(text).toBe("OK!");
    });
});