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
  filterCategory: number;
  filterProductName: string;
  minPrice: number;
  maxPrice: number;
  productpageSize: number;
  isProductLoading: boolean;
  productList: IProduct[];
  totalProduct: number;
}

const initProductState: InitProductState = {
  sortType: SortProductType.DEFAULT,
  filterCategory: -1,
  filterProductName: "",
  minPrice: 1,
  maxPrice: 100,
  productpageSize: 1,
  isProductLoading: false,
  productList: [],
  totalProduct: 0
};

export const getListProductApp = createAsyncThunk(
  "product/getListProductApp",
  async (url: string) => {
    const resListProduct = await fetch(url);
    if (resListProduct.ok) {
      const result = await resListProduct.json();
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
      state.minPrice = action.payload.min;
      state.maxPrice = action.payload.max;
    },
    changeFilerByName: (state, { payload }) => {
      state.filterProductName = payload;
    },
    changeFilterCategory: (state, { payload }) => {
      state.filterCategory = payload;
    },
    changeProductPageSize: (state, { payload }) => {
      state.productpageSize = payload;
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

export const {
  changeSortType,
  changeFilterPrice,
  changeFilerByName,
  changeFilterCategory,
  changeProductPageSize
} = productSlice.actions;

export default productSlice.reducer;
