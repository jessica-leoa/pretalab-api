// tests/unit/services/checkoutService.spec.ts
import { processCheckout } from '../../../src/services/checkoutService';
import { purchases } from '../../../src/data/purchasesData';
import { products } from '../../../src/data/productsData';

jest.mock('../../../src/data/purchasesData', () => ({
  purchases: []
}));

jest.mock('../../../src/data/productsData', () => ({
  products: [
    { id: 1, name: 'Notebook Gamer Pro', price: 7500 },
    { id: 2, name: 'Mouse Sem Fio Ultra-leve', price: 350 },
    { id: 3, name: 'Teclado Mecânico RGB', price: 550 }
  ]
}));

describe('Checkout Service - Unit Tests', () => {
  beforeEach(() => {
    purchases.length = 0;
  });

  describe('processCheckout', () => {
    it('should process checkout successfully and add to purchases', () => {
      const checkoutData = {
        cart: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 2 }
        ],
        total: 8200
      };

      processCheckout(checkoutData);

      expect(purchases).toHaveLength(1);
      expect(purchases[0]).toMatchObject({
        total: 8200,
        items: expect.arrayContaining([
          expect.objectContaining({
            productId: 1,
            name: 'Notebook Gamer Pro',
            price: 7500,
            quantity: 1
          }),
          expect.objectContaining({
            productId: 2,
            name: 'Mouse Sem Fio Ultra-leve', 
            price: 350,
            quantity: 2
          })
        ])
      });
    });

    it('should throw error when total exceeds 20000', () => {
      const checkoutData = {
        cart: [{ productId: 1, quantity: 3 }],
        total: 25000
      };

      expect(() => processCheckout(checkoutData))
        .toThrow('O valor total da compra excede o limite de R$20.000.');
    });

    it('should throw error when calculated total doesnt match', () => {
      const checkoutData = {
        cart: [{ productId: 1, quantity: 1 }], 
        total: 5000 
      };

      expect(() => processCheckout(checkoutData))
        .toThrow('Dados da compra inválidos.');
    });

    it('should throw error for non-existent product', () => {
      const checkoutData = {
        cart: [{ productId: 999, quantity: 1 }],
        total: 1000
      };

      expect(() => processCheckout(checkoutData))
        .toThrow('Dados da compra inválidos.');
    });

    it('should handle single product purchase', () => {
      const checkoutData = {
        cart: [{ productId: 3, quantity: 1 }],
        total: 550
      };

      processCheckout(checkoutData);

      expect(purchases).toHaveLength(1);
      expect(purchases[0]).toMatchObject({
        total: 550,
        items: expect.arrayContaining([
          expect.objectContaining({
            productId: 3,
            name: 'Teclado Mecânico RGB',
            price: 550,
            quantity: 1
          })
        ])
      });
    });
  });
});