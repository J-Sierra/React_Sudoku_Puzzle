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
      console.log("Action: CELL_CHANGE", "Payload: ", payload);
      let { cell, content } = payload;
      let { sector, sectorIndex } = cell;
      const clearedNotesArray = [];
      for (let i = 1; i < 10; i++) {
        clearedNotesArray.push({ visible: false, cellNoteNumber: i });
      }
      if (content === "x") {
        console.log(
          "Action: TOGGLE_NOTE_VISIBILITY",
          "Clearing cell: ",
          payload
        );
        return {
          ...state,
          sectors: [
            ...state.sectors.slice(0, sector),
            [
              ...state.sectors[sector].slice(0, sectorIndex),
              {
                ...state.sectors[sector][sectorIndex],
                number: null,
                notesArray: clearedNotesArray,
              },
              ...state.sectors[sector].slice(sectorIndex + 1),
            ],
            ...state.sectors.slice(sector + 1),
          ],
        };
      }
      return {
        ...state,
        sectors: [
          ...state.sectors.slice(0, sector),
          [
            ...state.sectors[sector].slice(0, sectorIndex),
            {
              ...state.sectors[sector][sectorIndex],
              number: content,
            },
            ...state.sectors[sector].slice(sectorIndex + 1),
          ],
          ...state.sectors.slice(sector + 1),
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
      return {
        ...state,
        sectors: [
          ...state.sectors.slice(0, sector),
          [
            ...state.sectors[sector].slice(0, sectorIndex),
            {
              ...state.sectors[sector][sectorIndex],
              notesArray: updatedNotesArray,
            },
            ...state.sectors[sector].slice(sectorIndex + 1),
          ],
          ...state.sectors.slice(sector + 1),
        ],
      };
    }
    default: {
      return state;
    }
  }
}
