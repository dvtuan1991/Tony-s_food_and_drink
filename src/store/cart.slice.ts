import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SERVICE_API } from "constants/configs";
import { ICart } from "types/cart.model";

interface InitCartState {
  total: number;
  carts: ICart[];
  isCartLoading: boolean;
}

const initCartState: InitCartState = {
  total: 0,
  carts: [],
  isCartLoading: false
};

export const createCart = createAsyncThunk(
  "cart/addCart",
  async ({
    userId,
    productId,
    isNew
  }: {
    userId: number;
    productId: number;
    isNew: boolean;
  }) => {
    const responseAddOrder = await fetch(`${SERVICE_API}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, isNew })
    });
    if (responseAddOrder.ok) {
      const result = await responseAddOrder.json();
      return result;
    }
  }
);

export const updateUserIdInCart = createAsyncThunk(
  "order/updateUserIdInCart",
  async ({ userId, guestId }: { userId: number; guestId: number }) => {
    const response = await fetch(`${SERVICE_API}/order/updateuserid`, {
      method: "PUT",
      body: JSON.stringify({ userId, guestId }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return response.json();
    }
  }
);

const cartSlice = createSlice({
  name: "carts",
  initialState: initCartState,
  reducers: {
    addCart: (state) => {
      state.total += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        updateUserIdInCart.fulfilled,
        (state, action: PayloadAction<ICart[]>) => {
          state.carts = action.payload;
        }
      )

      .addCase(createCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(createCart.fulfilled, (state, action: PayloadAction<ICart>) => {
        action.payload;
        state.carts.push(action.payload);
        state.isCartLoading = false;
      });
  }
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
