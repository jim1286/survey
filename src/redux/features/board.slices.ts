import { Board } from "@/interfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type BoardSliceState = {
  boards: Board[];
  clickedBoardId?: string;
};

const initialState: BoardSliceState = { boards: [], clickedBoardId: undefined };

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
    setClickedBoardId: (state, action: PayloadAction<string>) => {
      state.clickedBoardId = action.payload;
    },
  },
});

export const { addBoard, setBoards, setClickedBoardId } = boardSlice.actions;
export default boardSlice.reducer;
