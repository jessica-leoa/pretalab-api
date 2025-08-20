import { Request, Response } from 'express';
import { getAllPurchasesController, getPurchaseByIdController } from '../../../src/controller/purchasesController';
import { getAllPurchases, getPurchaseById } from '../../../src/services/purchasesService';

jest.mock('../../../src/services/purchasesService');

const mockRequest = (params: any = {}) => ({
  params
} as Request);

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe("Purchases Controller - Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllPurchasesController", () => {
    it("should return all purchases with 200 status", async () => {
      const req = mockRequest();
      const res = mockResponse();
      
      const mockPurchases = [
        {
          id: "1",
          date: "2024-07-28T14:45:12Z",
          total: 7850,
          items: [{
            productId: 1,
            quantity: 1,
            name: "Notebook Gamer Pro",
            price: 7500
          }]
        }
      ];
      
      (getAllPurchases as jest.Mock).mockReturnValue(mockPurchases);

      await getAllPurchasesController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPurchases);
    });

    it("should handle errors with 500 status", async () => {
      const req = mockRequest();
      const res = mockResponse();
      
      (getAllPurchases as jest.Mock).mockImplementation(() => {
        throw new Error("Database error");
      });

      await getAllPurchasesController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro interno do servidor"
      });
    });
  });

  describe("getPurchaseByIdController", () => {
    it("should return purchase when found", async () => {
      const req = mockRequest({ id: "1" });
      const res = mockResponse();
      
      const mockPurchase = {
        id: "1",
        date: "2024-07-28T14:45:12Z",
        total: 7850,
        items: [{
          productId: 1,
          quantity: 1,
          name: "Notebook Gamer Pro",
          price: 7500
        }]
      };
      
      (getPurchaseById as jest.Mock).mockReturnValue(mockPurchase);

      await getPurchaseByIdController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPurchase);
    });

    it("should return 404 when purchase not found", async () => {
      const req = mockRequest({ id: "999" });
      const res = mockResponse();
      
      (getPurchaseById as jest.Mock).mockReturnValue(undefined);

      await getPurchaseByIdController(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Compra não encontrada."
      });
    });
  });
});