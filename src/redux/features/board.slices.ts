import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type BoardSliceState = {};

const initialState: BoardSliceState = {};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
});

// export const {} = boardSlice.actions;
export default boardSlice.reducer;
