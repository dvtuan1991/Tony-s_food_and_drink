import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SERVICE_API } from "constants/configs";
import { fetchApi } from "helpers/function";
import { IOrder } from "types/order.model";

interface InitOrderState {
  orders: IOrder[];
  isOrderLoading: boolean;
}

const initOrderState: InitOrderState = {
  orders: [],
  isOrderLoading: false
};

export const getOrderList = createAsyncThunk(
  "order/getOrderList",
  async (userId: number) => {
    const getListOrder = await fetchApi(`${SERVICE_API}/orderlist/${userId}`);
    return getListOrder;
  }
);

export const updateStatusOrder = createAsyncThunk(
  "order/updateStatusOrder",
  async ({ id, status }: { id: string; status: string }) => {
    let body = {};
    if (status === "complete") {
      body = { isComplete: true };
    }
    if (status === "cancel") {
      body = { isCancel: true };
    }
    const response = await fetch(`${SERVICE_API}/orderlist/${id}/update`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    if (response.ok) {
      return response.json();
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: initOrderState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderList.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(
        getOrderList.fulfilled,
        (state, action: PayloadAction<IOrder[]>) => {
          state.orders = action.payload;
          state.isOrderLoading = false;
        }
      )

      .addCase(updateStatusOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(
        updateStatusOrder.fulfilled,
        (state, action: PayloadAction<IOrder>) => {
          const findIndex = state.orders.findIndex(
            (order) => order.id === action.payload.id
          );
          state.orders[findIndex] = action.payload;
          state.isOrderLoading = false;
        }
      );
  }
});

export default orderSlice.reducer;
