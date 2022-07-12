import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SERVICE_API } from "constants/configs";
import { fetchApi } from "helpers/function";

import { SortProductType, IProduct } from "types/product.model";

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
    const promise = new Promise<any>((resolve) => {
      setTimeout(() => {
        const resListProduct = fetch(url);
        resolve(resListProduct);
      }, 300);
    });
    const res = await promise;
    if (res.ok) {
      const result = await res.json();

      if (result.listProduct.length > 0) {
        const updateListProduct = await Promise.all(
          result.listProduct.map(async (product: IProduct) => {
            const getCategory = await fetchApi(
              `${SERVICE_API}/category/${product.categoryId}`
            );
            return { ...product, categoryName: getCategory.name };
          })
        );
        return {
          listProduct: updateListProduct,
          total: result.total
        };
      }
      return result;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initProductState,
  reducers: {},
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

export default productSlice.reducer;
