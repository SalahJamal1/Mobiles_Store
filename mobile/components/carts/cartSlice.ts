import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  badge?: string;
  inStock: boolean;
  discount?: number;
  colorImages?: Record<string, string>;
}

export interface Cart {
  quantity: number;
  totalPrice: number;
  item: Product;
}

interface CartState {
  carts: Cart[];
}
const initialState: CartState = {
  carts: [],
};
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart(state: CartState, action: PayloadAction<Cart>) {
      state.carts.push(action.payload);
    },
    incCart(state: CartState, action: PayloadAction<number>) {
      const currentProduct = state.carts.find(
        (cart) => cart.item.id === action.payload,
      );
      if (!currentProduct) return;
      currentProduct.quantity++;
      currentProduct.totalPrice =
        currentProduct.quantity * currentProduct.item.price;
    },
    decCart(state: CartState, action: PayloadAction<number>) {
      const currentProduct = state.carts.find(
        (cart) => cart.item.id === action.payload,
      );
      if (!currentProduct) return;
      currentProduct.quantity--;
      currentProduct.totalPrice =
        currentProduct.quantity * currentProduct.item.price;
      if (currentProduct.quantity <= 0) {
        cartSlice.caseReducers.removeFromCart(state, action);
      }
    },
    removeFromCart(state: CartState, action: PayloadAction<number>) {
      state.carts = state.carts.filter(
        (cart) => cart.item.id !== action.payload,
      );
    },
    clearCart(state: CartState) {
      state.carts = [];
    },
  },
});

export const { addToCart, incCart, decCart, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
