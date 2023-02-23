import {CELL_CHANGE, GAME_BOARD_READY, CELL_SELECTED} from "./actionTypes"

export const gameBoardReady = () => ({
    type: GAME_BOARD_READY,
    payload: {}
});
export const onCellChange = (content, cell) => ({

    type: CELL_CHANGE,
    payload: {
        content: content,
        cell: cell
    }
});

export const onCellSelected = (cell) => ({
    type: CELL_SELECTED,
    payload: {
        cell: cell
    }

});