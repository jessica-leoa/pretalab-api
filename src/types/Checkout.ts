export interface CartItem {
  productId: number;
  quantity: number;
}

export interface CheckoutRequest {
  cart: CartItem[];
  total: number;
}