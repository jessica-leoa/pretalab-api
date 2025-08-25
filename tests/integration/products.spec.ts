// tests/integration/products.spec.ts
import request from "supertest";
import app from "../../src/app";
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("GET /api/products", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all products from external API", async () => {
    // Mock da API externa
    mockedAxios.get.mockResolvedValue({
      data: [
        { id: "1", name: "Notebook Gamer Pro", price: 7500 },
        { id: "2", name: "Mouse Sem Fio Ultra-leve", price: 350 }
      ]
    });

    const response = await request(app).get("/api/products");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([
      expect.objectContaining({
        id: "1",
        name: "Notebook Gamer Pro",
        price: 7500
      }),
      expect.objectContaining({
        id: "2",
        name: "Mouse Sem Fio Ultra-leve", 
        price: 350
      })
    ]);
  });

  it("should return specific product by id", async () => {
    // Mock da API externa
    mockedAxios.get.mockResolvedValue({
      data: { id: "1", name: "Notebook Gamer Pro", price: 7500 }
    });

    const response = await request(app).get("/api/products/1");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: "1",
      name: "Notebook Gamer Pro",
      price: 7500
    });
  });

  it("should return 404 for non-existent product id", async () => {
    // Mock de erro 404
    mockedAxios.get.mockRejectedValue({
      response: { status: 404 }
    });

    const response = await request(app).get("/api/products/999");

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      message: "Produto não encontrado"
    });
  });
});