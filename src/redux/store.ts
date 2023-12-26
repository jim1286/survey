import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./features/board.slices";

export const store = configureStore({
  reducer: {
    boardSlice: boardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
