import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APP_PAGE_SIZE, SERVICE_API } from "constants/configs";

import { SortProductType, IProduct } from "types/product.model";

interface FilterList {
  price: { min: number; max: number };
}

interface SortAndFilter {
  sortType: string;
  filterList: FilterList;
}

interface InitProductState {
  sortType: string;
  filterList: FilterList;
  isProductLoading: boolean;
  productList: IProduct[];
  totalProduct: number;
}

const initProductState: InitProductState = {
  sortType: SortProductType.DEFAULT,
  filterList: {} as FilterList,
  isProductLoading: false,
  productList: [],
  totalProduct: 0
};

export const getListProductApp = createAsyncThunk(
  "product/getListProductApp",
  async ({
    sortAndFilter,
    pageIndex
  }: {
    sortAndFilter: SortAndFilter;
    pageIndex: number;
  }) => {
    let price: string = "";
    if (sortAndFilter.filterList.price) {
      price = `&min=${sortAndFilter.filterList.price.min}&max=${sortAndFilter.filterList.price.max}`;
    }
    const resListProduct = await fetch(
      `${SERVICE_API}/product/list?index=${pageIndex}&limit=${APP_PAGE_SIZE}&sort=${sortAndFilter.sortType}${price}`
    );
    if (resListProduct.ok) {
      const result = await resListProduct.json();
      console.log(result);
      return result;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initProductState,
  reducers: {
    changeSortType: (state, action) => {
      state.sortType = action.payload;
    },
    changeFilterPrice: (
      state,
      action: PayloadAction<{ min: number; max: number }>
    ) => {
      state.filterList.price = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListProductApp.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(
        getListProductApp.fulfilled,
        (
          state,
          action: PayloadAction<{ listProduct: IProduct[]; total: number }>
        ) => {
          state.productList = action.payload.listProduct;
          state.totalProduct = action.payload.total;
          state.isProductLoading = false;
        }
      );
  }
});

export const { changeSortType, changeFilterPrice } = productSlice.actions;

export default productSlice.reducer;
