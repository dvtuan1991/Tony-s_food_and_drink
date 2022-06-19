import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types/User";

interface InitUserState {
  user: IUser
}
const initUserState: InitUserState = {
  user: {} as IUser
};

const userSlice = createSlice({
  name: 'users',
  initialState: initUserState,
  reducers: {}
});

// export const { } = userSlice.actions;

export default userSlice.reducer;