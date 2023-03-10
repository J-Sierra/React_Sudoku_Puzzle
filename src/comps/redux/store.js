import { configureStore } from "@reduxjs/toolkit";
import sudokuReducer from "./SudokuSlice";

const store = configureStore({
  reducer: {
    sudoku: sudokuReducer,
    devTools: process.env.NODE_ENV !== "production",
  },
});

export default store;
