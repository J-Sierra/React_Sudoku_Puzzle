import { CELL_CHANGE, GAME_BOARD_READY } from "../actions/actionTypes";

const initialState = {
  gameBoard: [],
  sectors: [],
  gameBoardReady: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GAME_BOARD_READY: {
      return {
        ...state,
        gameBoardReady: true,
      };
    }
    case CELL_CHANGE: {
      console.log(payload);
      console.log(state);
      let { cell, content } = payload;
      let { sectorRow, sectorCol } = cell;
      if (content === "x") {
        return {
          ...state,
          sectors: [
            ...state.sectors.slice(0, sectorRow),
            [
              ...state.sectors[sectorRow].slice(0, sectorCol),
              {
                ...state.sectors[sectorRow][sectorCol],
                number: null,
              },
              ...state.sectors[sectorRow].slice(sectorCol + 1),
            ],
            ...state.sectors.slice(sectorRow + 1),
          ],
        };
      }
      return {
        ...state,
        sectors: [
          ...state.sectors.slice(0, sectorRow),
          [
            ...state.sectors[sectorRow].slice(0, sectorCol),
            {
              ...state.sectors[sectorRow][sectorCol],
              number: content,
            },
            ...state.sectors[sectorRow].slice(sectorCol + 1),
          ],
          ...state.sectors.slice(sectorRow + 1),
        ],
      };
    }

    default: {
      return state;
    }
  }
}
