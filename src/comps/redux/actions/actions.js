import {
  CELL_CHANGE,
  CELL_SELECTED,
  SET_GAME_BOARD_READY,
  NEW_GAME,
  SET_DIFFICULTY, TOGGLE_NOTE_VISIBILITY,
} from "./actionTypes";

export const setGameboardReadyStatus = (value) => ({
  type: SET_GAME_BOARD_READY,
  payload: {
    value: value,
  },
});
export const onCellChange = (content, cell) => ({
  type: CELL_CHANGE,
  payload: {
    content: content,
    cell: cell,
  },
});

export const onCellSelected = (cell) => ({
  type: CELL_SELECTED,
  payload: {
    cell: cell,
  },
});

export const newGame = () => ({
  type: NEW_GAME,
});
export const setDifficulty = (difficulty) => ({
  type: SET_DIFFICULTY,
  payload: {
    difficulty: difficulty,
  },
});
export function toggleNoteVisibility(cell, noteNumber) {
  return {
    type: TOGGLE_NOTE_VISIBILITY,
    payload: {
      cell,
      noteNumber,
    },
  };
}