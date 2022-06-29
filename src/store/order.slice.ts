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
      );
  }
});

export default orderSlice.reducer;
