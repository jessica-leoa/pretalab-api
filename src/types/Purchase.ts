export interface PurchaseItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
}

export interface Purchase {
  id: string;
  date: string;
  total: number;
  items: PurchaseItem[];
}