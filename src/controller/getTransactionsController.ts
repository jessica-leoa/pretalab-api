import { Request, Response } from 'express'; 
import { getTransactionsById } from '../services/transactionsService';
import { transactions } from "../data";

// Pegar transação por ID (/api/transactions/:id)
export const getTransactionByIdController = async (req: Request, res: Response) => {
    const { id } = req.params; 
    const transaction = getTransactionsById(id); 
    if (!transaction) {
        return res.status(404).json({ message: 'Transação não encontrada' });
    }
    return res.status(200).json(transaction);
}

// Pegar todas as transações (/api/transactions)
export const getAllTransactionsController = (_req: Request, res: Response) => {
  return res.status(200).json(transactions); 
};

