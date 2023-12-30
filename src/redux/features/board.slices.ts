import { Board, BoardResult } from "@/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type BoardSliceState = {
  boards: Board[];
  boardResults: BoardResult[];
  clickedBoardId?: string;
};

const initialState: BoardSliceState = {
  boards: [],
  boardResults: [],
  clickedBoardId: undefined,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
    },
    setBoardResults: (state, action: PayloadAction<BoardResult[]>) => {
      state.boardResults = action.payload;
    },
    setClickedBoardId: (state, action: PayloadAction<string>) => {
      state.clickedBoardId = action.payload;
    },
    clearBoardResult: (state) => {
      state.boardResults = [];
    },
  },
});

export const {
  setBoards,
  setBoardResults,
  setClickedBoardId,
  clearBoardResult,
} = boardSlice.actions;
export default boardSlice.reducer;
