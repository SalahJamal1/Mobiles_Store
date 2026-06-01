import { CAPACITIES } from "@/utils/helpers";
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

interface Capacity {
  name: string;
  extra: number;
}
export interface Cart {
  quantity: number;
  totalPrice: number;
  item: Product;
  storageCapacity?: Capacity | null;
}

interface CartState {
  carts: Cart[];
  selectedCapacity: Capacity;
}
const initialState: CartState = {
  carts: [],
  selectedCapacity: CAPACITIES[0],
};
const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setSelectedCapacity(state: CartState, action: PayloadAction<Capacity>) {
      state.selectedCapacity = action.payload;
    },
    addToCart(state: CartState, action: PayloadAction<Cart>) {
      if (action.payload.item.category === "Electronics") {
        const cart: Cart = {
          ...action.payload,

          totalPrice:
            Number(action.payload.item.price) + state.selectedCapacity.extra,
        };
        state.carts.push(cart);
      } else {
        state.carts.push(action.payload);
      }
    },
    incCart(
      state: CartState,
      action: PayloadAction<{ id: number; capacityName: string }>,
    ) {
      const product = state.carts.find(
        (cart) => cart.item.id === action.payload.id,
      );
      if (product?.item.category === "Electronics") {
        const currentProduct = state.carts.find(
          (cart) =>
            cart.item.id === action.payload.id &&
            cart.storageCapacity?.name === action.payload.capacityName,
        );
        if (!currentProduct) return;
        currentProduct.quantity++;
        const price = +currentProduct.item.price + state.selectedCapacity.extra;
        currentProduct.totalPrice = currentProduct.quantity * price;
      } else {
        if (!product) return;
        product.quantity++;
        product.totalPrice = product.quantity * product.item.price;
      }
    },
    decCart(
      state: CartState,
      action: PayloadAction<{ id: number; capacityName: string }>,
    ) {
      const product = state.carts.find(
        (cart) => cart.item.id === action.payload.id,
      );
      if (product?.item.category === "Electronics") {
        const currentProduct = state.carts.find(
          (cart) =>
            cart.item.id === action.payload.id &&
            cart.storageCapacity?.name === action.payload.capacityName,
        );
        if (!currentProduct) return;
        currentProduct.quantity--;
        const price =
          Number(currentProduct.item.price) + state.selectedCapacity.extra;
        currentProduct.totalPrice = currentProduct.quantity * price;
        if (currentProduct.quantity <= 0) {
          cartSlice.caseReducers.removeFromCart(state, action);
        }
      } else {
        if (!product) return;
        product.quantity--;
        product.totalPrice = product.quantity * product.item.price;
        if (product.quantity <= 0) {
          cartSlice.caseReducers.removeFromCart(state, action);
        }
      }
    },

    removeFromCart(
      state: CartState,
      action: PayloadAction<{ id: number; capacityName: string }>,
    ) {
      const product = state.carts.find(
        (cart) => cart.item.id === action.payload.id,
      );
      if (product?.item.category === "Electronics") {
        state.carts = state.carts.filter(
          (cart) =>
            !(
              cart.item.id === action.payload.id &&
              cart.storageCapacity?.name === action.payload.capacityName
            ),
        );
      } else {
        state.carts = state.carts.filter(
          (cart) => cart.item.id !== action.payload.id,
        );
      }
    },
    clearCart(state: CartState) {
      state.carts = [];
    },
  },
});

export const {
  addToCart,
  incCart,
  decCart,
  removeFromCart,
  clearCart,
  setSelectedCapacity,
} = cartSlice.actions;

export default cartSlice.reducer;
