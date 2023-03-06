import {
  CELL_CHANGE,
  NEW_GAME,
  SET_DIFFICULTY,
  SET_GAME_BOARD_READY,
  TOGGLE_NOTE_VISIBILITY,
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
      let { cell, content } = payload;
      let { sectorRow, sectorCol } = cell;
      const clearedNotesArray = [];
      for (let i = 1; i < 10; i++) {
        clearedNotesArray.push({ visible: false, cellNoteNumber: i });
      }
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
                notesArray: clearedNotesArray,
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
    case TOGGLE_NOTE_VISIBILITY: {
      console.log("Action: TOGGLE_NOTE_VISIBILITY", "Payload: ", payload);
      const { cell, noteNumber } = payload;
      const { sectorRow, sectorCol } = cell;

      const updatedNotesArray = state.sectors[sectorRow][
        sectorCol
      ].notesArray.map((n) => {
        if (n.cellNoteNumber === noteNumber) {
          return {
            ...n,
            visible: !n.visible,
          };
        }
        return n;
      });
      return {
        ...state,
        sectors: [
          ...state.sectors.slice(0, sectorRow),
          [
            ...state.sectors[sectorRow].slice(0, sectorCol),
            {
              ...state.sectors[sectorRow][sectorCol],
              notesArray: updatedNotesArray,
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
