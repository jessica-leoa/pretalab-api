// tests/integration/app.spec.ts
import request from "supertest";
import app from "../../src/app";

describe("App Root", () => {
  it("should return API message on root route", async () => {
    const response = await request(app).get("/");
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Transactions API v2.5"
    });
  });

  it("should return 404 for unknown routes", async () => {
    const response = await request(app).get("/unknown-route");
    expect(response.status).toBe(404);
  });
});