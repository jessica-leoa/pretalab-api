import { Request, Response } from 'express';
import { processCheckout } from '../services/checkoutService';
import { CheckoutRequest } from '../types/Checkout';

export const checkoutController = (req: Request, res: Response) => {
  try {
    const checkoutData: CheckoutRequest = req.body;
    
    // Validações básicas
    if (!checkoutData.cart || !Array.isArray(checkoutData.cart) || checkoutData.cart.length === 0) {
      return res.status(400).json({ message: 'Dados da compra inválidos.' });
    }
    
    if (typeof checkoutData.total !== 'number' || checkoutData.total <= 0) {
      return res.status(400).json({ message: 'Dados da compra inválidos.' });
    }
    
    // Validando estrutura do carrinho
    for (const item of checkoutData.cart) {
      if (typeof item.productId !== 'number' || typeof item.quantity !== 'number' || item.quantity <= 0) {
        return res.status(400).json({ message: 'Dados da compra inválidos.' });
      }
    }
    
    // Processando checkout
    processCheckout(checkoutData);
    
    res.status(200).json({ message: 'Compra processada com sucesso!' });
    
  } catch (error: any) {
    if (error.message.includes('excede o limite')) {
      res.status(400).json({ message: error.message });
    } else if (error.message.includes('inválidos')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};