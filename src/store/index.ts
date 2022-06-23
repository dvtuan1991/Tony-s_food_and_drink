import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart.slice";

import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    carts: cartSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
