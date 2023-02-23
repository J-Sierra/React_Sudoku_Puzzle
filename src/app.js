import React, {Component} from 'react';
import './comps/styles/app.scss';
import Sector from "./comps/sector";
import {connect} from "react-redux";
import {gameBoardReady} from "./comps/redux/actions/actions";


class App extends Component {


    componentDidMount() {
        this.initiateGame();
        this.generateNumbers();
        this.setDifficulty(60);
        this.createSectors();
        this.props.onGameBoardReady()
    }

    render() {
        const {sectors, gameBoardReady} = this.props;
        return (
            <div className="App">
                <div className="App-Container">
                    <header>
                        Sudoku
                    </header>

                    <div id="Sudoku-Container">

                        {gameBoardReady
                            ? sectors.map((sector, key) =>
                                <Sector
                                    sector={sector}
                                    key={key * Math.random()}
                                />
                            )
                            : null}
                    </div>

                </div>
            </div>

        );
    }

    //Starts the process of making the game board of 3x3 sectors each containing 3x3 of cells.
    initiateGame() {
        //game board and sectors arrays received from the Redux store
        const {gameBoard, sectors} = this.props;

        //game board and Sectors get populated with 9 empty arrays
        for (let i = 1; i < 10; i++) {
            gameBoard.push([]);
            sectors.push([]);
        }
        //Each game board sector is then populated with 9 empty cells
        gameBoard.forEach(region => {
            for (let i = 0; i < 9; i++) {
                region.push(null)
            }
        })
    }

    //
    generateNumbers() {
        const {gameBoard} = this.props;

        //Cycles through each cell to find a number that works for Sudoku
        for (let row = 0; row < gameBoard.length; row++) {
            for (let col = 0; col < gameBoard[row].length; col++) {

                //returns a number that is confirmed to not be present in neither the row
                let num = this.getNoConflictNumber(row, col)
                //If the getNoConflictNumber method returns a 0, the number does not fit in neither the row
                //nor column. The entire row is reset to empty values, column is reset to the start
                //of the row, and the row counter is reduced by one
                //else, the number is non-conflicting and can be placed in the cell
                if (num === 0) {
                    gameBoard.splice(row, 1, [0, 0, 0, 0, 0, 0, 0, 0, 0])
                    col = 0
                    row--
                    break
                } else {
                    gameBoard[row].splice(col, 1, num)
                }
            }
        }

        console.log(gameBoard)
    }

    //Attempts to find a number that does not conflict with any other number in row, column, or sector
    getNoConflictNumber(row, col) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        //Selects a number from the array at random and deletes it from the options
        let num = numbers.splice(this.getRandomInt(numbers.length), 1)[0]

        //loops until a non-conflicting number is found or returns 0 by checking if the number is conflicting
        //If the number is not in conflict, it skips the while loop
        while (this.numberConflicts(row, col, num)) {
            //if the number is in conflict, and numbers still remain to try, selects a new number to try
            if (numbers.length > 0) {
                num = numbers.splice(this.getRandomInt(numbers.length), 1)[0]
                //If no numbers remain to try, send a '0' and break the for loop
            } else {
                num = 0
                break
            }

        }
        return num
    }

    numberConflicts = (row, col, num) => {
        const {gameBoard} = this.props;
        //Placeholder array for the numbers contained withing a sector
        let sectorNumbers = []
        //Calculates the numbers within the sector that the current number resides in and
        //stores them within an array
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                sectorNumbers.push(gameBoard[(Math.floor(row / 3) * 3) + i][(Math.floor(col / 3) * 3) + j])
            }
        }

        //Checks if the 'num' is present in its row, column, or sector and returns the boolean result
        return gameBoard[row].includes(num) || Array.from(gameBoard.map(r => r[col])).includes(num) || sectorNumbers.includes(num)
    }

    createSectors() {
        const {gameBoard, sectors} = this.props;

        let sectorRow = null;
        let sectorCol = null;

        //Calculates the numbers in each sector and retrieves them each row and column and saves them
        //in order in an array for each sector
        gameBoard.map((gameBoardRow, row) => (
            gameBoardRow.map((cell, col) => {
                sectorRow = Math.floor(col / 3) + (Math.floor(row / 3) * 3)
                sectorCol = (col % 3) + ((row % 3) * 3);

                // sectors[sectorRow].push([cell, sectorRow, sectorCol, row, col, false])
                return (
                    sectors[sectorRow].push(
                        {
                            "number": cell,
                            "sectorRow": sectorRow,
                            "sectorCol": sectorCol,
                            "row": row,
                            "col": col,
                            "selected": false
                        }
                    ))
            })
        ))

        console.log(sectors)
    }

    //Set the difficulty of the game by deleting a certain amount of cells from the finished solved board
    setDifficulty(difficulty) {
        const {gameBoard} = this.props;

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
                gameBoard[randRow].splice(randCol, 1, null)
            } else {
                i--
            }

        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}


function mapStateToProps(state) {
    const {
        gameBoard,
        sectors,
        gameBoardReady
    } = state.gameBoardReducer
    return {
        gameBoard,
        sectors,
        gameBoardReady
    }
}

function mapActionsToProps() {
    return {onGameBoardReady: gameBoardReady}
}

export default connect(mapStateToProps, mapActionsToProps())(App)
