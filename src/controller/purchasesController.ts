import { Request, Response } from 'express';
import { getAllPurchases, getPurchaseById } from '../services/purchasesService';

export const getAllPurchasesController = (_req: Request, res: Response) => {
  try {
    const purchases = getAllPurchases();
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getPurchaseByIdController = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Tavez aqui eu precise validar o id!!! (Melhoria futura)
    const purchase = getPurchaseById(id);
    
    if (!purchase) {
      return res.status(404).json({ message: 'Compra não encontrada.' });
    }
    
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
