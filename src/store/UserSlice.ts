import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../types/User";

interface InitUserState {
  user: IUser;
  isUserLoading: boolean;
}
const initUserState: InitUserState = {
  user: {} as IUser,
  isUserLoading: false
};

const userSlice = createSlice({
  name: "users",
  initialState: initUserState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setLoading: (state) => {
      state.isUserLoading = true;
    },

    setNoLoading: (state) => {
      state.isUserLoading = false;
    }
  }
});

export const { addUser, setLoading, setNoLoading } = userSlice.actions;

export default userSlice.reducer;
