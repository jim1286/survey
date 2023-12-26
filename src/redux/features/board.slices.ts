import { Board } from "@/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type BoardSliceState = {
  boards: Board[];
};

const initialState: BoardSliceState = { boards: [] };

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards = state.boards.concat(action.payload);
    },
  },
});

export const { addBoard } = boardSlice.actions;
export default boardSlice.reducer;
