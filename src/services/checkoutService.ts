import { randomUUID } from 'crypto';
import { CheckoutRequest, CartItem } from '../types/Checkout';
import { Purchase, PurchaseItem } from '../types/Purchase';
import { purchases } from '../data/purchasesData';
import { products } from '../data/productsData';

export const processCheckout = (checkoutData: CheckoutRequest): void => {
  
  // Validar se o total confere com o cálculo real
  validateTotal(checkoutData);

    if (checkoutData.total > 20000) {
    throw new Error('O valor total da compra excede o limite de R$20.000.');
    
  }
  
  const itemsWithDetails = getProductsWithDetails(checkoutData.cart);
  
  
  // Criando objeto de compra
  const purchase: Purchase = {
    id: randomUUID(),
    date: new Date().toISOString(),
    total: checkoutData.total,
    items: itemsWithDetails
  };
  
  // Adicionando ao histórico
  purchases.push(purchase);
};

const validateTotal = (checkoutData: CheckoutRequest) => {
  const calculatedTotal = checkoutData.cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity  : 0);
  }, 0);
  
  if (Math.abs(calculatedTotal - checkoutData.total) > 0.01) {
    throw new Error('Dados da compra inválidos.');
  }
};

const getProductsWithDetails = (cart: CartItem[]): PurchaseItem[] => {
  return cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) {
      throw new Error('Dados da compra inválidos.');
    }
    
    return {
      productId: product.id,
      quantity: item.quantity,
      name: product.name,
      price: product.price
    };
  });
};