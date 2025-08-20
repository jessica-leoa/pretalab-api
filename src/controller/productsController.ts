// src/controller/productsController.ts
import { Request, Response } from 'express';
import { getAllProducts, getProductById } from '../services/productsService';

export const getAllProductsController = (_req: Request, res: Response) => {
  try {
    const products = getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

export const getProductByIdController = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = getProductById(Number(id));
    
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};