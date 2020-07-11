import React, {Component} from 'react';
import './App.css';
import Sector from "./comps/Sector";

class App extends Component {
    state = {
        gameBoard: [],
        sectors: [],
        gameBoardReady: false
    }


    componentDidMount() {
        this.initiateGame();
        this.createSectors();
        this.setState({gameBoardReady: true})
    }

    render() {
        let {gameBoardReady, sectors} = this.state;

        return (
            <div className="App">
                <header className="App-header">

                    <div id="Sudoku-Container">

                        {gameBoardReady
                            ? sectors.map((sector, key) =>
                                <Sector
                                    sector={sector}
                                    key={key}
                                />
                            )
                            : null}
                    </div>

                </header>
            </div>
        );
    }


    initiateGame() {
        const {gameBoard, sectors} = this.state;
        for (let i = 1; i < 10; i++) {
            gameBoard.push([]);
            sectors.push([]);
        }
        gameBoard.forEach(region => {
            for (let i = 0; i < 9; i++) {
                region.push(null)
            }
        })


        this.generateNumbers();
    }

    generateNumbers() {
        let {gameBoard} = this.state;
        for (let row = 0; row < gameBoard.length; row++) {
            for (let col = 0; col < gameBoard[row].length; col++) {
                let num = this.getNoConflictNumber(row, col)
                if (num === 0) {
                    this.state.gameBoard.splice(row, 1, [0, 0, 0, 0, 0, 0, 0, 0, 0])
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

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    isConflict = (row, col, num) => {
        let {gameBoard} = this.state;
        let sectorNums = []

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                sectorNums.push(gameBoard[(Math.floor(row / 3) * 3) + i][(Math.floor(col / 3) * 3) + j])
            }
        }

        return gameBoard[row].includes(num) || Array.from(gameBoard.map(r => r[col])).includes(num) || sectorNums.includes(num)
    }

    getNoConflictNumber(row, col) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let num = numbers.splice(this.getRandomInt(numbers.length), 1)

        while (this.isConflict(row, col, num[0])) {
            if (numbers.length > 0) {
                num = numbers.splice(this.getRandomInt(numbers.length), 1)

            } else {
                num = [0]
                break
            }

        }
        return num[0]
    }

    createSectors() {
        let {gameBoard, sectors} = this.state;
        let calcedRow = null;
        gameBoard.map((gameBoardRow, row) => (
            gameBoardRow.map((cell, col) => {
                calcedRow = Math.floor(col / 3) + (Math.floor(row / 3) * 3)
                return (
                    sectors[calcedRow].push([cell, row, col]))
            })
        ))
        console.log(sectors)
    }
}

export default App;
