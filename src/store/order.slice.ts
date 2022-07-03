import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SERVICE_API } from "constants/configs";
import { fetchApi } from "helpers/function";
import { FilterOrderType, IOrder, SortOrderType } from "types/order.model";

interface InitOrderState {
  orders: IOrder[];
  sortType: string;
  filter: string;
  totalLeng: number;
  isOrderLoading: boolean;
}

const initOrderState: InitOrderState = {
  orders: [],
  sortType: SortOrderType.DEFAULT,
  filter: FilterOrderType.DEFAULT,
  totalLeng: 0,
  isOrderLoading: false
};

export const getOrderList = createAsyncThunk(
  "order/getOrderList",
  async (url: string) => {
    const getListOrder = await fetchApi(url);
    return { ...getListOrder };
  }
);

export const updateStatusOrder = createAsyncThunk(
  "order/updateStatusOrder",
  async (data: { id: string; isComplete: boolean; isCancel: boolean }) => {
    const { id, ...body } = data;
    const responseUpdateOrder = await fetch(
      `${SERVICE_API}/orderlist/${id}/update`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );
    if (responseUpdateOrder.ok) {
      const responseUpdateCart = await fetch(
        `${SERVICE_API}/order/${id}/byorderlist`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            isSuccess: data.isComplete,
            isCancel: data.isCancel
          })
        }
      );
      return data;
    }
    return {
      id: "",
      isComplete: false,
      isCancel: false
    };
  }
);

export const updateUserIdInOrder = createAsyncThunk(
  "cart/updateUserIdInOrder",
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

const orderSlice = createSlice({
  name: "orders",
  initialState: initOrderState,
  reducers: {
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
    changeOrderFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderList.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(
        getOrderList.fulfilled,
        (
          state,
          action: PayloadAction<{ listOrder: IOrder[]; leng: number }>
        ) => {
          state.orders = action.payload.listOrder;
          state.totalLeng = action.payload.leng;
          state.isOrderLoading = false;
        }
      )

      .addCase(updateStatusOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(
        updateStatusOrder.fulfilled,
        (
          state,
          action: PayloadAction<{
            id: string;
            isComplete: boolean;
            isCancel: boolean;
          }>
        ) => {
          const findIndex = state.orders.findIndex(
            (order) => order.id === action.payload?.id
          );
          state.orders[findIndex].isComplete = action.payload.isComplete;
          state.orders[findIndex].isCancel = action.payload.isCancel;
          state.isOrderLoading = false;
        }
      )
      .addCase(updateStatusOrder.rejected, (state) => {
        state.isOrderLoading = false;
      })

      .addCase(
        updateUserIdInOrder.fulfilled,
        (state, action: PayloadAction<IOrder[]>) => {
          state.orders = action.payload;
          state.totalLeng = state.orders.length;
        }
      );
  }
});

export const { changeSortType, changeOrderFilter } = orderSlice.actions;
export default orderSlice.reducer;
