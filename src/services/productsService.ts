import { products } from '../data/productsData';
import axios from 'axios';
import { Product } from '../types/product';

// API da profe
const API_URL = 'https://pretalab-api-439254010866.us-central1.run.app/products';


export const getAllProducts = async (): Promise<Product[]> => {
   try {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos da API:', error);
    throw new Error('Não foi possível carregar os produtos');
  }
};


export const getProductById = async (id: string): Promise<Product | undefined> => {
 try {
    const response = await axios.get<Product>(`${API_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return undefined;
    }
    console.error('Erro ao buscar produto da API:', error);
    throw new Error('Não foi possível carregar o produto');
  }
};