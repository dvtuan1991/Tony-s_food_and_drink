import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../types/User";

interface InitUserState {
  user: IUser;
}
const initUserState: InitUserState = {
  user: {} as IUser
};

const userSlice = createSlice({
  name: "users",
  initialState: initUserState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    }
  }
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
