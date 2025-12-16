import request from "supertest";
import app from "../../src/app";
import {describe, it} from "node:test";

describe("Auth - Login", () => {
    beforeAll(async () => {
        // Register user before login test
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Mahesh",
                email: "mahesh@test.com",
                password: "password123",
            });
    });

    it("should login and return token", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "mahesh@test.com",
                password: "password123",
            });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });
});
