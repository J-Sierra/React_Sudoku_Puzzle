import {
  CELL_CHANGE,
  CELL_SELECTED,
  GAME_BOARD_READY,
  NEW_GAME,
} from "./actionTypes";

export const gameBoardReady = (ready) => ({
  type: GAME_BOARD_READY,
  payload: {
    ready: ready,
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
