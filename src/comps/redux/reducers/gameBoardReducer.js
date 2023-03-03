import {
  CELL_CHANGE,
  NEW_GAME,
  SET_DIFFICULTY,
  SET_GAME_BOARD_READY,
} from "../actions/actionTypes";

const initialState = {
  gameBoard: [],
  sectors: [],
  gameBoardReady: false,
  difficulty: 40,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_GAME_BOARD_READY: {
      return {
        ...state,
        gameBoardReady: payload.value,
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
    case NEW_GAME: {
      console.log("Resetting state");
      return {
        ...state,
        gameBoard: [],
        sectors: [],
        gameBoardReady: false,
      };
    }
    case SET_DIFFICULTY: {
      return {
        ...state,
        difficulty: payload.difficulty,
      };
    }
    default: {
      return state;
    }
  }
}
