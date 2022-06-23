import { createSlice } from "@reduxjs/toolkit";

interface InitCartState {
  total: number;
}

const initCartState: InitCartState = {
  total: 0
};

const cartSlice = createSlice({
  name: "carts",
  initialState: initCartState,
  reducers: {
    addCart: (state) => {
      state.total += 1;
    }
  }
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
