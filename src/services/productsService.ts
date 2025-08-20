import { products } from '../data/productsData';
import { Product } from '../types/product';

export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};