import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart.slice";
import commentSlice from "./comment.slice";
import orderSlice from "./order.slice";
import productSlice from "./product.slice";

import userSlice from "./user.slice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    carts: cartSlice,
    orders: orderSlice,
    products: productSlice,
    comments: commentSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
