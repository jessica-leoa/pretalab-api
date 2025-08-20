import request from "supertest";
import app from "../../src/app";
import { purchases } from "../../src/data/purchasesData";

// Mock dos dados
jest.mock("../../src/data/purchasesData", () => ({
  purchases: []
}));

describe("Purchases API - Integration Tests", () => {
  beforeEach(() => {
    purchases.length = 0;
    purchases.push(
      {
        id: "1",
        date: "2024-07-28T14:45:12Z",
        total: 7850,
        items: [
          {
            productId: 1,
            quantity: 1,
            name: "Notebook Gamer Pro",
            price: 7500
          },
          {
            productId: 2,
            quantity: 1,
            name: "Mouse Sem Fio Ultra-leve",
            price: 350
          }
        ]
      },
      {
        id: "2",
        date: "2024-07-29T10:30:00Z",
        total: 1200,
        items: [
          {
            productId: 3,
            quantity: 2,
            name: "Teclado Mecânico RGB",
            price: 550
          }
        ]
      }
    );
  });

  describe("GET /api/purchases", () => {
    it("should return all purchases ordered by date (newest first)", async () => {
      const response = await request(app).get("/api/purchases");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(2);

      // Usando toMatchObject para verificar estrutura
      expect(response.body[0]).toMatchObject({
        id: "2", 
        date: "2024-07-29T10:30:00Z",
        total: 1200
      });

      expect(response.body[1]).toMatchObject({
        id: "1",
        date: "2024-07-28T14:45:12Z", 
        total: 7850
      });
    });

    it("should return purchases with correct item structure", async () => {
      const response = await request(app).get("/api/purchases");

      // Verifica estrutura dos items
      expect(response.body[0].items[0]).toMatchObject({
        productId: 3,
        quantity: 2,
        name: "Teclado Mecânico RGB",
        price: 550
      });

      expect(response.body[1].items[0]).toMatchObject({
        productId: 1,
        quantity: 1,
        name: "Notebook Gamer Pro",
        price: 7500
      });
    });
  });

  describe("GET /api/purchases/:id", () => {
    it("should return a specific purchase by id", async () => {
      const response = await request(app).get("/api/purchases/1");

      expect(response.status).toBe(200);
      
      // toMatchObject verifica se tem pelo menos estas propriedades
      expect(response.body).toMatchObject({
        id: "1",
        total: 7850,
        items: expect.any(Array) 
      });

      expect(response.body.items[0]).toMatchObject({
        productId: 1,
        name: "Notebook Gamer Pro",
        price: 7500
      });
    });

    it("should return 404 for non-existent purchase id", async () => {
      const response = await request(app).get("/api/purchases/999");

      expect(response.status).toBe(404); 
      expect(response.body).toMatchObject({
        message: "Compra não encontrada."
      });
    });

    it("should handle empty id parameter", async () => { 
      const response = await request(app).get("/api/purchases/");

      expect([200, 404, 400]).toContain(response.status);
    });
  });
});