// src/services/purchasesService.ts
import { purchases } from '../data/purchasesData';
import { Purchase } from '../types/Purchase';

export const getAllPurchases = (): Purchase[] => {
  return purchases.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getPurchaseById = (id: string): Purchase | undefined => {
  return purchases.find(purchase => purchase.id === id);
};
