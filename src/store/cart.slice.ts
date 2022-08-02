import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SERVICE_API } from "constants/configs";
import { ICart } from "types/cart.model";

interface InitCartState {
  total: number;
  carts: ICart[];
  cartsCheckOut: ICart[];
  totalPrice: number;
  isCartLoading: boolean;
  error: any;
}

const initCartState: InitCartState = {
  total: 0,
  carts: [],
  cartsCheckOut: [],
  totalPrice: 0,
  isCartLoading: false,
  error: undefined
};

export const createCart = createAsyncThunk(
  "cart/addCart",
  async ({
    userId,
    productId,
    quantity,
    price,
    isNew
  }: {
    userId: number;
    productId: number;
    quantity: number;
    price: number;
    isNew: boolean;
  }) => {
    const responseAddOrder = await fetch(`${SERVICE_API}/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, price, quantity, isNew })
    });
    if (responseAddOrder.ok) {
      const result = await responseAddOrder.json();
      return result;
    }
  }
);

export const getCartByUserId = createAsyncThunk(
  "cart/getOrderByUserId",
  async (id: number) => {
    const response = await fetch(`${SERVICE_API}/order/${id}?status=cart`);
    if (response.ok) {
      return response.json();
    }
  }
);

export const updateUserIdInCart = createAsyncThunk(
  "cart/updateUserIdInCart",
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

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (cart: ICart) => {
    const response = await fetch(`${SERVICE_API}/order/${cart.id}/update`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cart)
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
    changeQuantity: (state, action) => {
      const indexCart = state.carts.findIndex(
        (cart) => cart.id === action.payload.id
      );
      const indexCartCheckout = state.cartsCheckOut.findIndex(
        (cart) => cart.id === action.payload.id
      );
      state.carts[indexCart].quantity = action.payload.quantity;
      state.carts[indexCart].price = action.payload.price;
      state.cartsCheckOut[indexCartCheckout].quantity = action.payload.quantity;
      state.cartsCheckOut[indexCartCheckout].price = action.payload.price;
    },
    setCartCheckOut: (state, action) => {
      state.cartsCheckOut = action.payload.map((item: string) => {
        return state.carts.filter((cart) => cart.id === item)[0];
      });
      state.totalPrice = state.cartsCheckOut.reduce(
        (total: number, cart: ICart) => (total += cart.price),
        0
      );
    },
    setTotalPrice: (state, { payload }) => {
      const list = payload.map((item: string) =>
        state.carts.find((cart) => cart.id === item)
      );
      state.totalPrice = list.reduce(
        (total: number, cart: ICart) => (total += cart.price),
        0
      );
    },

    changeCartToOrder: (state) => {
      state.cartsCheckOut = [];
    },

    removeCart: (state, { payload }) => {
      const index = state.carts.findIndex((cart) => cart.id === payload);
      state.carts.splice(index, 1);
    },

    clearCart: (state) => {
      state.total = 0;
      state.carts = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        updateUserIdInCart.fulfilled,
        (state, action: PayloadAction<ICart[]>) => {
          state.carts = action.payload;
          state.total = state.carts.length;
        }
      )

      .addCase(createCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(
        createCart.fulfilled,
        (state, action: PayloadAction<ICart[]>) => {
          state.carts = action.payload;
          state.total = state.carts.length;
          state.isCartLoading = false;
        }
      )

      .addCase(getCartByUserId.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(
        getCartByUserId.fulfilled,
        (state, action: PayloadAction<ICart[]>) => {
          state.carts = action.payload;
          state.total = action.payload.length;
          state.isCartLoading = false;
        }
      )
      .addCase(getCartByUserId.rejected, (state, action: any) => {
        state.error = action.payload;
        state.isCartLoading = false;
      })

      .addCase(updateCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action: PayloadAction<ICart>) => {
        const index = state.carts.findIndex(
          (cart) => (cart.id = action.payload.id)
        );
        state.carts[index] = { ...action.payload };
        state.isCartLoading = false;
      });
  }
});

export const {
  changeQuantity,
  setCartCheckOut,
  changeCartToOrder,
  removeCart,
  clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
