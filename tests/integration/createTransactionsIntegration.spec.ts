import request from "supertest";
import app from "../../src/app";
import { transactions } from "../../src/data";

describe("Transactions API Integration Tests", () => {
  describe("GET /api/transactions", () => {
    it("should return all transactions", async () => {
      const response = await request(app)
        .get("/api/transactions");

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(2); 
      expect(response.body[0]).toHaveProperty("id", "test-1");
    });
  });

  describe("GET /api/transactions/:id", () => {
    it("should return a specific transaction", async () => {
      const response = await request(app)
        .get("/api/transactions/test-1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: "test-1",
        date: "2024-01-01T00:00:00Z",
        description: "Salário Teste",
        amount: 1000,
        type: "income",
        category: "Salário"
      });
    });

    it("should return 404 for non-existent transaction", async () => {
      const response = await request(app)
        .get("/api/transactions/non-existent-id");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "Transação não encontrada"
      });
    });
  });

  describe("POST /api/transactions", () => {
    it("should create a new transaction with valid data", async () => {
      const newTransaction = {
        amount: 200,
        description: "Nova transação teste",
        type: "expense" as const
      };

      const response = await request(app)
        .post("/api/transactions")
        .send(newTransaction);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        description: "Nova transação teste",
        amount: 200,
        type: "expense",
        category: "Uncategorized"
      });
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("date");

      // Verificando se foi adicionado ao array
      expect(transactions).toHaveLength(3);
    });

    it("should return 400 when missing required fields", async () => {
      const invalidData = {
        description: "Faltando amount e type"
      };

      const response = await request(app)
        .post("/api/transactions")
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Campos obrigatórios: amount, description, type"
      });
    });

    it("should return 400 when amount is invalid", async () => {
      const invalidData = {
        amount: -100,
        description: "Amount negativo",
        type: "expense"
      };

      const response = await request(app)
        .post("/api/transactions")
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Amount deve ser um número positivo"
      });
    });

    it("should return 400 when type is invalid", async () => {
      const invalidData = {
        amount: 100,
        description: "Tipo inválido",
        type: "invalid_type"
      };

      const response = await request(app)
        .post("/api/transactions")
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'Type deve ser "income" ou "expense"'
      });
    });
  });
});