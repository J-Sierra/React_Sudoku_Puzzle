import { createSlice } from "@reduxjs/toolkit";
import gameboard from "../gameboard";
import produce from "immer";

const initialState = {
  gameBoard: [],
  sectors: [],
  gameBoardReady: false,
  difficulty: 40,
};

export const sudokuSlice = createSlice({
  name: "sudoku",
  initialState,
  reducers: {
    initiateGame: (state) => {
      console.log("Action: Initiate game");
      // Populate gameBoard and sectors arrays with 9 empty sub-arrays each
      for (let i = 0; i < 9; i++) {
        state.gameBoard.push(Array(9).fill(null));
        state.sectors.push([]);
      }
      console.log(state.gameBoard);
    },
    setGameboardReadyStatus: (state, action) => {
      console.log("Action: Set Game Board Ready Status");
      state.gameBoardReady = action.payload.gameBoardReady;
    },
    onCellChange: (state, { payload }) => {
      console.log("Action: CELL_CHANGE", "Payload: ", payload);
      const { cell, content } = payload;
      const { sector, sectorIndex } = cell;
      const clearedNotesArray = [];
      for (let i = 1; i < 10; i++) {
        clearedNotesArray.push({ visible: false, cellNoteNumber: i });
      }
      if (content === "x") {
        console.log("Clearing cell: ", payload);
        state.sectors[sector][sectorIndex] = {
          ...state.sectors[sector][sectorIndex],
          number: null,
          notesArray: clearedNotesArray,
        };
      } else {
        state.sectors[sector][sectorIndex] = {
          ...state.sectors[sector][sectorIndex],
          number: content,
        };
      }
    },
    updateGameBoard: (state, action) => {
      console.log("Action: Update Game Board");
      const { tempGameBoard } = action.payload;
      state.gameBoard = tempGameBoard;
      console.log("Test: Temp Game Board", action);
    },
    newGame: (state) => {
      console.log("Resetting state");
      state.gameBoard = [];
      state.sectors = [];
      state.gameBoardReady = false;
    },
    setDifficulty: (state, { payload }) => {
      state.difficulty = payload.difficulty;
    },
    toggleNoteVisibility: (state, action) => {
      console.log(
        "Action: TOGGLE_NOTE_VISIBILITY",
        "Payload: ",
        action.payload
      );
      const { cell, noteNumber } = action.payload;
      const { sector, sectorIndex } = cell;

      const updatedNotesArray = state.sectors[sector][
        sectorIndex
      ].notesArray.map((n) => {
        if (n.cellNoteNumber === noteNumber) {
          return {
            ...n,
            visible: !n.visible,
          };
        }
        return n;
      });

      state.sectors[sector][sectorIndex] = {
        ...state.sectors[sector][sectorIndex],
        notesArray: updatedNotesArray,
      };
    },
    handleCellSelectedHighlight: (state, action) => {
      console.log(
        "Action: HANDLE_CELL_SELECTED_HIGHLIGHT",
        "Payload: ",
        action.payload
      );
      const { cell, selected } = action.payload;
      const { row, col, sector } = cell;
      let selectedSector = state.sectors[sector];
      let selectedRow = [];
      let selectedCol = [];
      const allSelectedCells = [];
      //Add the corresponding row of the selected Cell
      state.sectors
        .slice(Math.floor(row / 3) * 3, Math.floor(row / 3) * 3 + 3)
        .map((sector) =>
          selectedRow.push(...sector.slice((row % 3) * 3, (row % 3) * 3 + 3))
        );
      //Add the corresponding col of the selected Cell
      for (let i = 0; i < 3; i++) {
        let tempColSectorSlice = state.sectors[Math.floor(col / 3) + i * 3];
        for (let j = 0; j < 3; j++) {
          selectedCol.push(
            tempColSectorSlice.slice(
              Math.floor(col % 3) + j * 3,
              Math.floor(col % 3) + j * 3 + 1
            )[0]
          );
        }
      }
      [selectedRow, selectedCol, selectedSector].forEach((selectedCells) => {
        selectedCells.forEach((cell) => {
          if (
            !allSelectedCells.some(
              (selectedCell) =>
                selectedCell.row === cell.row && selectedCell.col === cell.col
            )
          ) {
            allSelectedCells.push(cell);
          }
        });
      });

      allSelectedCells.forEach((cell) => {
        cell.selected = selected;
      });

      return {
        ...state,
        sectors: [...state.sectors],
      };
    },
    toggleCellEditing: (state, action) => {
      console.log("Action: TOGGLE_CELL_EDITING", "Payload: ", action.payload);
      const { cell, editing } = action.payload;
      const { sector, sectorIndex } = cell;
      const updatedSectors = [...state.sectors];

      updatedSectors[sector][sectorIndex] = {
        ...updatedSectors[sector][sectorIndex],
        editing,
      };
      return {
        ...state,
        sectors: updatedSectors,
      };
    },
  },
});

export const {
  handleCellSelectedHighlight,
  toggleCellEditing,
  setGameboardReadyStatus,
  onCellChange,
  newGame,
  setDifficulty,
  toggleNoteVisibility,
  initiateGame,
  updateGameBoard,
} = sudokuSlice.actions;
export default sudokuSlice.reducer;
