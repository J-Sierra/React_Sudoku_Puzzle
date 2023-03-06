import React, { Component } from "react";
import "./styles/app.scss";
import Sector from "./sector";
import { connect } from "react-redux";
import { setGameboardReadyStatus } from "./redux/actions/actions";

class Gameboard extends Component {
  componentDidMount() {
    console.log(this.props);
    let { gameBoardReady, setGameboardReadyStatus, difficulty } = this.props;
    if (!gameBoardReady) {
      this.initiateGame();
      this.generateNumbers();
      this.setDifficulty(difficulty);
      this.createSectors();
      setGameboardReadyStatus(true);
    }
  }

  render() {
    const { sectors, gameBoardReady } = this.props;
    return (
      <div id="Sudoku-Container">
        {gameBoardReady
          ? sectors.map((sector, key) => (
              <Sector sector={sector} key={key * Math.random()} />
            ))
          : null}
      </div>
    );
  }

  //Starts the process of making the game board of 3x3 sectors each containing 3x3 of cells.
  initiateGame() {
    // Retrieve gameBoard and sectors arrays from Redux store
    const { gameBoard, sectors } = this.props;

    // Populate gameBoard and sectors arrays with 9 empty sub-arrays each
    for (let i = 1; i < 10; i++) {
      gameBoard.push([]);
      sectors.push([]);
    }

    // Populate each sub-array of gameBoard with 9 null values
    gameBoard.forEach((region) => {
      for (let i = 0; i < 9; i++) {
        region.push(null);
      }
    });
  }

  //
  generateNumbers() {
    const { gameBoard } = this.props;

    //Cycles through each cell to find a number that works for Sudoku
    for (let row = 0; row < gameBoard.length; row++) {
      for (let col = 0; col < gameBoard[row].length; col++) {
        // Get a number that doesn't conflict with existing numbers in the row, column, and sector
        let num = this.getANoNConflictingNumber(row, col);
        // If the number returned is 0, reset the row and restart generating numbers for the row
        if (num === 0) {
          gameBoard.splice(row, 1, [0, 0, 0, 0, 0, 0, 0, 0, 0]);
          col = 0;
          row--;
          break;
        } else {
          // Place the non-conflicting number in the current cell of the game board
          gameBoard[row].splice(col, 1, num);
        }
      }
    }
  }

  //Attempts to find a number that does not conflict with any other number in row, column, or sector
  getANoNConflictingNumber(row, col) {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    //Selects a number from the array at random and deletes it from the options
    let num = numbers.splice(this.getRandomInt(numbers.length), 1)[0];

    //loops until a non-conflicting number is found or returns 0 by checking if the number is conflicting
    //If the number is not in conflict, it skips the while loop
    while (this.numberConflicts(row, col, num)) {
      //if the number is in conflict, and numbers still remain to try, selects a new number to try
      if (numbers.length > 0) {
        num = numbers.splice(this.getRandomInt(numbers.length), 1)[0];
        //If no numbers remain to try, send a '0' and break the for loop
      } else {
        num = 0;
        break;
      }
    }
    return num;
  }

  // This function takes in a row, column, and number and checks if that number conflicts
  // with the current board in its row, column, or sector.

  numberConflicts = (row, col, num) => {
    // Destructure the gameBoard object from the props passed to this component.
    const { gameBoard } = this.props;

    // Calculate the sector that the current number resides in and store all numbers in the sector.
    const sectorNumbers = gameBoard
      .slice(Math.floor(row / 3) * 3, Math.floor(row / 3) * 3 + 3) // get the rows in the sector
      .flatMap((r) =>
        r.slice(Math.floor(col / 3) * 3, Math.floor(col / 3) * 3 + 3)
      ); // get the numbers in the sector

    // Check if the number is present in its row, column, or sector and return the boolean result.
    return (
      gameBoard[row].includes(num) ||
      gameBoard.map((r) => r[col]).includes(num) ||
      sectorNumbers.includes(num)
    );
  };

  createSectors() {
    // Destructure the gameBoard and sectors from the props
    const { gameBoard, sectors } = this.props;
    const notesArray = [];
    for (let i = 1; i < 10; i++) {
      notesArray.push({ visible: false, cellNoteNumber: i });
    }
    // Loop through each cell in the game board
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // Calculate the sector row and column for the current cell
        const sectorRow = Math.floor(col / 3) + Math.floor(row / 3) * 3;
        const sectorCol = (col % 3) + (row % 3) * 3;

        // Get the value of the current cell
        const cellNumber = gameBoard[row][col];


        // Create a new object representing the current cell, and add it to the correct sector in the sectors array
        sectors[sectorRow].push({
          number: cellNumber,
          sectorRow,
          sectorCol,
          row,
          col,
          selected: false,
          editable: cellNumber === null,
          notesArray
        });
      }
    }

    // Log the sectors array to the console for debugging purposes
    console.log("This is the sectors array", sectors);
  }

  //Set the difficulty of the game by deleting a certain amount of cells from the finished solved board
  setDifficulty(difficulty) {
    const { gameBoard } = this.props;

    let randRow = null;
    let randCol = null;

    //Loops through the number of times determined by the function argument
    for (let i = 0; i < difficulty; i++) {
      //Generates a random row and column to check
      randRow = this.getRandomInt(9);
      randCol = this.getRandomInt(9);

      //If the random cell contains a number, change that cell value to null
      //else, set back the loop counter by 1 and try again
      if (gameBoard[randRow][randCol]) {
        gameBoard[randRow].splice(randCol, 1, null);
      } else {
        i--;
      }
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  handleNewGame() {
    console.log("Starting New Game");
    let { startNewGame } = this.props;
    startNewGame();
  }
}

const mapStateToProps = (state) => ({
  ...state.gameBoardReducer,
});

function mapActionsToProps(dispatch) {
  return {
    setGameboardReadyStatus: (value) =>
      dispatch(setGameboardReadyStatus(value)),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(Gameboard);
