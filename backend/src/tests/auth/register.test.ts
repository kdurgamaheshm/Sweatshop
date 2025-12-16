import request from "supertest";
import app from "../";
import {describe, it} from "node:test";
//register
describe("Auth - Register", () => {
    it("should register a new user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Mahesh",
                email: "mahesh@test.com",
                password: "password123",
            });

        expect(res.status).toBe(201);
    });

    it("should reject duplicate email", async () => {
        await request(app).post("/api/auth/register").send({
            name: "Mahesh",
            email: "duplicate@test.com",
            password: "password123",
        });

        const res = await request(app).post("/api/auth/register").send({
            name: "Mahesh",
            email: "duplicate@test.com",
            password: "password123",
        });

        expect(res.status).toBe(400);
    });
});
