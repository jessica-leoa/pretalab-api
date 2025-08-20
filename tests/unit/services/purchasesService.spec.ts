import { getAllPurchases, getPurchaseById } from "../../../src/services/purchasesService";
import { purchases } from "../../../src/data/purchasesData";

jest.mock("../../../src/data/purchasesData", () => ({
  purchases: []
}));

describe("Purchases Service - Unit Tests", () => {
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
          }
        ]
      },
      {
        id: "2",
        date: "2024-07-29T10:30:00Z", 
        total: 1200,
        items: [
          {
            productId: 2,
            quantity: 1,
            name: "Mouse Sem Fio",
            price: 350
          }
        ]
      }
    );
  });

  describe("getAllPurchases", () => {
    it("should return all purchases ordered by date (newest first)", () => {
      const result = getAllPurchases();

      expect(result).toHaveLength(2);
      
      expect(result[0]).toMatchObject({
        id: "2", 
        date: "2024-07-29T10:30:00Z"
      });

      expect(result[1]).toMatchObject({
        id: "1",
        date: "2024-07-28T14:45:12Z"
      });
    });

    it("should return empty array when no purchases", () => {
      purchases.length = 0;
      
      const result = getAllPurchases();
      expect(result).toEqual([]);
    });
  });

  describe("getPurchaseById", () => {
    it("should return purchase when found", () => {
      const result = getPurchaseById("1");
      
      expect(result).toMatchObject({
        id: "1",
        total: 7850,
        items: expect.any(Array)
      });

      expect(result?.items[0]).toMatchObject({
        productId: 1,
        name: "Notebook Gamer Pro"
      });
    });

    it("should return undefined for non-existent id", () => {
      const result = getPurchaseById("999");
      expect(result).toBeUndefined();
    });

    it("should return undefined for empty id", () => {
      const result = getPurchaseById("");
      expect(result).toBeUndefined();
    });
  });
});