export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CheckoutRequest {
  cart: CartItem[];
  total: number;
}