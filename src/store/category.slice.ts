import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SERVICE_API } from "constants/configs";
import { fetchApi } from "helpers/function";
import { ICategory } from "types/category.model";

interface InitCategoryState {
  categories: ICategory[];
  isCategoryLoading: boolean;
}

const initCategoryState: InitCategoryState = {
  categories: [],
  isCategoryLoading: false
};

export const getListCategories = createAsyncThunk(
  "categories/getListCategories",
  async () => {
    const categories = await fetchApi(`${SERVICE_API}/category`);
    return categories;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: initCategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListCategories.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(
        getListCategories.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.categories = action.payload;
          state.isCategoryLoading = false;
        }
      );
  }
});
export default categorySlice.reducer;
