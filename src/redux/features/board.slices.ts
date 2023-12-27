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
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards = state.boards.concat(action.payload);
      state.clickedBoardId = action.payload.id;
    },
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
    },
    setBoardResults: (state, action: PayloadAction<BoardResult[]>) => {
      state.boardResults = action.payload;
    },
    setClickedBoardId: (state, action: PayloadAction<string>) => {
      state.clickedBoardId = action.payload;
    },
  },
});

export const { addBoard, setBoards, setBoardResults, setClickedBoardId } =
  boardSlice.actions;
export default boardSlice.reducer;
