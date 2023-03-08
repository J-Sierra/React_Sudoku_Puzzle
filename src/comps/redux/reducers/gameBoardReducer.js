import {
  CELL_CHANGE,
  NEW_GAME,
  SET_DIFFICULTY,
  SET_GAME_BOARD_READY,
  TOGGLE_NOTE_VISIBILITY,
  HANDLE_CELL_SELECTED_HIGHLIGHT,
  TOGGLE_CELL_EDITING,
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
        console.log("Clearing cell: ", payload);
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
    case HANDLE_CELL_SELECTED_HIGHLIGHT: {
      console.log(
        "Action: HANDLE_CELL_SELECTED_HIGHLIGHT",
        "Payload: ",
        payload
      );
      const { cell, selected } = payload;
      const { row, col, sector } = cell;
      let selectedSector = state.sectors[sector];
      let selectedRow = [];
      let selectedCol = [];
      const allSelectedCells = [cell];
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
    }

    case TOGGLE_CELL_EDITING: {
      console.log("Action: TOGGLE_CELL_EDITING", "Payload: ", payload);
      const { cell, editing } = payload;
      cell.editing = editing;
      return { ...state };
    }

    default: {
      return state;
    }
  }
}
