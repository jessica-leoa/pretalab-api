import request from "supertest";
import app from "../../src/app";
import { products } from "../../src/data/productsData";

jest.mock("../../src/data/productsData", () => ({
  products: [
    { id: 1, name: "Notebook Gamer Pro", price: 7500 },
    { id: 2, name: "Mouse Sem Fio Ultra-leve", price: 350 }
  ]
}));

describe("GET /api/products", () => {
  it("should return all products", async () => {
    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([
      expect.objectContaining({
        id: 1,
        name: "Notebook Gamer Pro",
        price: 7500
      }),
      expect.objectContaining({
        id: 2,
        name: "Mouse Sem Fio Ultra-leve",
        price: 350
      })
    ]);
  });

  it("should return specific product by id", async () => {
    const response = await request(app).get("/api/products/1");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 1,
      name: "Notebook Gamer Pro",
      price: 7500
    });
  });

  it("should return 404 for non-existent product id", async () => {
    const response = await request(app).get("/api/products/999");

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      message: "Produto não encontrado"
    });
  });
});