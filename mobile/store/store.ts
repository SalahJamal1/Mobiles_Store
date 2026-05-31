import carts from "@/components/carts/cartSlice";
import user from "@/components/profile/userSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: { carts, user },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
