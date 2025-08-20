import { Request, Response } from 'express';
import { checkoutController } from '../../../src/controller/checkoutController';
import { processCheckout } from '../../../src/services/checkoutService';

jest.mock('../../../src/services/checkoutService');

const mockRequest = (body: any = {}) => ({
  body
} as Request);

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe('Checkout Controller - Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with success message for valid checkout', async () => {
    const req = mockRequest({
      cart: [{ productId: 1, quantity: 1 }],
      total: 7500
    });
    const res = mockResponse();

    (processCheckout as jest.Mock).mockImplementation(() => {});

    await checkoutController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Compra processada com sucesso!'
    });
  });

  it('should return 400 for exceeded limit', async () => {
    const req = mockRequest({
      cart: [{ productId: 1, quantity: 1 }],
      total: 25000
    });
    const res = mockResponse();

    (processCheckout as jest.Mock).mockImplementation(() => {
      throw new Error('O valor total da compra excede o limite de R$20.000.');
    });

    await checkoutController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'O valor total da compra excede o limite de R$20.000.'
    });
  });

  it('should return 400 for invalid cart data', async () => {
    const req = mockRequest({
      cart: 'invalid',
      total: 1000
    });
    const res = mockResponse();

    await checkoutController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Dados da compra inválidos.'
    });
  });

  it('should return 400 for empty cart', async () => {
    const req = mockRequest({
      cart: [],
      total: 0
    });
    const res = mockResponse();

    await checkoutController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Dados da compra inválidos.'
    });
  });

  it('should return 500 for internal server error', async () => {
    const req = mockRequest({
      cart: [{ productId: 1, quantity: 1 }],
      total: 7500
    });
    const res = mockResponse();

    (processCheckout as jest.Mock).mockImplementation(() => {
      throw new Error('Database error');
    });

    await checkoutController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Erro interno do servidor'
    });
  });
});