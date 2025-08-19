import { Request, Response } from "express"; 
import { createTransaction } from "../services/transactionsService";
import { randomUUID } from "crypto";

export const createTransactionController = (req: Request, res: Response): void => {
  const { amount, description, type } = req.body;

  // Validação dos campos obrigatórios
   if (typeof amount !== 'number' || amount <= 0) {
    res.status(400).json({ 
      message: 'Amount deve ser um número positivo' 
    });
    return;
  }

    if (type !== 'income' && type !== 'expense') {
    res.status(400).json({ 
      message: 'Type deve ser "income" ou "expense"' 
    });
    return;
  }

   if (!amount || !description || !type) {
    res.status(400).json({ 
      message: 'Campos obrigatórios: amount, description, type' 
    });
    return;
  }

  // só ent QUANDO passar validações vai cria a transação
  const newTransaction = createTransaction({
    id: randomUUID(),
    date: new Date().toISOString(),
    description,
    amount,
    type,
    category: "Uncategorized"
  });

  res.status(201).json(newTransaction);
};
