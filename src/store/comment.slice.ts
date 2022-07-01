import { createSlice } from "@reduxjs/toolkit";
import { IComment } from "types/comment.model";

interface InitCommnetState {
  comment: IComment;
}

const initCommentState: InitCommnetState = {
  comment: {} as IComment
};

const commentSlice = createSlice({
  name: "comments",
  initialState: initCommentState,
  reducers: {
    addCommentValue: (state, { payload }) => {
      state.comment = payload;
    }
  }
});

export const { addCommentValue } = commentSlice.actions;
export default commentSlice.reducer;
