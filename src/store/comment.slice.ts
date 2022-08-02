import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchApi } from "helpers/function";
import { IComment } from "types/comment.model";

interface InitCommnetState {
  comment: IComment;
  listComment: IComment[];
  totalLeng: number;
  pageIndex: number;
  filterComment: number;
  sortType: string;
  isCommentLoading: boolean;
}

const initCommentState: InitCommnetState = {
  comment: {} as IComment,
  listComment: [],
  totalLeng: 0,
  pageIndex: 1,
  filterComment: 0,
  sortType: "new",
  isCommentLoading: false
};

export const getListComment = createAsyncThunk(
  "comment/getListComment",
  async (url: string) => {
    const lists = await fetchApi(url);
    return lists;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState: initCommentState,
  reducers: {
    addCommentValue: (state, { payload }) => {
      state.comment = payload;
    },
    changeFilterComment: (state, { payload }) => {
      state.filterComment = payload;
    },
    changeSortype: (state, { payload }) => {
      state.sortType = payload;
    },
    changePageIndex: (state, { payload }) => {
      state.pageIndex = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListComment.pending, (state) => {
        state.isCommentLoading = true;
      })
      .addCase(
        getListComment.fulfilled,
        (
          state,
          action: PayloadAction<{ listComment: IComment[]; leng: number }>
        ) => {
          state.listComment = action.payload.listComment;
          state.totalLeng = action.payload.leng;
          state.isCommentLoading = false;
        }
      );
  }
});

export const { addCommentValue, changeFilterComment, changeSortype, changePageIndex } =
  commentSlice.actions;
export default commentSlice.reducer;
