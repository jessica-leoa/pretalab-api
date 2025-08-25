import request from "supertest";
import app from "../../src/app";
import { purchases } from "../../src/data/purchasesData";

jest.mock("../../src/data/purchasesData", () => ({
  purchases: []
}));

jest.mock("../../src/data/productsData", () => ({
  products: [
    { id: "1", name: "Notebook Gamer Pro", price: 7500 },
    { id: "2", name: "Mouse Sem Fio Ultra-leve", price: 350 },
    { id: "3", name: "Teclado Mecânico RGB", price: 550 }
  ]
}));

describe("POST /api/checkout", () => {
  beforeEach(() => {
    purchases.length = 0;
  });

  it("should process checkout successfully and return 200 with success message", async () => {
    const checkoutData = {
      cart: [
        { productId: "1", quantity: 1 },
        { productId: "2", quantity: 2 }
      ],
      total: 8200
    };

    const response = await request(app)
      .post("/api/checkout")
      .send(checkoutData);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: "Compra processada com sucesso!"
    });
    
    expect(purchases[0]).toMatchObject({
      total: 8200,
      items: expect.arrayContaining([
        expect.objectContaining({
          productId: "1",
          name: "Notebook Gamer Pro",
          price: 7500,
          quantity: 1
        }),
        expect.objectContaining({
          productId: "2", 
          name: "Mouse Sem Fio Ultra-leve",
          price: 350,
          quantity: 2
        })
      ])
    });
  });

  it("should return 400 when total exceeds 20000", async () => {
    const checkoutData = {
      cart: [{ productId: "1", quantity: 3 }],
      total: 25000
    };

    const response = await request(app)
      .post("/api/checkout")
      .send(checkoutData);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "O valor total da compra excede o limite de R$20.000."
    });
    
    expect(purchases).toHaveLength(0);
  });

  it("should return 400 for invalid cart data structure", async () => {
    const invalidData = {
      cart: "invalid",
      total: 1000
    };

    const response = await request(app)
      .post("/api/checkout")
      .send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Dados da compra inválidos."
    });
  });

  it("should return 400 for empty cart", async () => {
    const invalidData = {
      cart: [],
      total: 0
    };

    const response = await request(app)
      .post("/api/checkout")
      .send(invalidData);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Dados da compra inválidos."
    });
  });

  it("should return 400 for non-existent product", async () => {
    const checkoutData = {
      cart: [{ productId: "999", quantity: 1 }],
      total: 1000
    };

    const response = await request(app)
      .post("/api/checkout")
      .send(checkoutData);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Dados da compra inválidos."
    });
  });

  it("should return 400 when calculated total doesn't match sent total", async () => {
    const checkoutData = {
      cart: [
        { productId: "1", quantity: 1 }
      ],
      total: 5000
    };

    const response = await request(app)
      .post("/api/checkout")
      .send(checkoutData);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Dados da compra inválidos."
    });
  });

  it("should return 400 for negative quantity", async () => {
    const checkoutData = {
      cart: [{ productId: "1", quantity: -1 }],
      total: 1000
    };

    const response = await request(app)
      .post("/api/checkout")
      .send(checkoutData);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Dados da compra inválidos."
    });
  });
});