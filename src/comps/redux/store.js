import { configureStore } from "@reduxjs/toolkit";
import sudokuReducer from "./SudokuSlice";

const store = configureStore({
  reducer: {
    sudoku: sudokuReducer,
  },
});

export default store;
