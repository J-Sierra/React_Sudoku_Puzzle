import {CELL_CHANGE, GAME_BOARD_READY, CELL_SELECTED} from "../actions/actionTypes";

const initialState = {
    gameBoard: [],
    sectors: [],
    gameBoardReady: false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, {
    type,
    payload
}) {
    switch (type) {
        case GAME_BOARD_READY: {
            return {
                ...state,
                gameBoardReady: true
            }
        }
        case CELL_CHANGE: {
            let {
                sectorRow,
                sectorCol
            } = payload.cell
            let {sectors} = state

            console.log(payload)
            sectors[sectorRow][sectorCol] = {
                ...sectors[sectorRow][sectorCol],
                number: payload.content
            }

            return state

        }
        case CELL_SELECTED: {
            let {
                sectorRow,
                sectorCol,
                row,
                col
            } = payload.cell;
            let {sectors} = state

            sectors[sectorRow].forEach((cell, i) => {
                return sectors[sectorRow][i] = {
                    ...cell,
                    selected: true
                }
            })
            return state

        }
        default: {
            return state
        }

    }

}