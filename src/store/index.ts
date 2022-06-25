import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart.slice";
import productSlice from "./product.slice";

import userSlice from "./user.slice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    carts: cartSlice,
    products: productSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
