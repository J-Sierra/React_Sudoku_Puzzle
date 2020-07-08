import React, {Component} from 'react';
import './App.css';

class App extends Component {
    state = {
        gameData: []
    }

    eachRegion = () => {

    }

    componentDidMount() {
        this.initiateGame();

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">

                    <div id="Sudoku-Container">
                        {this.state.gameData.map(this.eachRegion)}
                    </div>

                </header>
            </div>
        );
    }


    initiateGame() {
        const {gameData} = this.state;
        for (let i = 1; i < 10; i++) {
            gameData.push([])
        }
        gameData.forEach(region => {
            for (let i = 0; i < 9; i++) region.push(null)
        })


        this.generateNumbers();
    }

    generateNumbers() {
        let {gameData} = this.state;
        for (let row = 0; row < gameData.length; row++) {
            for (let col = 0; col < gameData[row].length; col++) {
                let num = this.getNoConflictNumber(row, col)
                if (num === 0) {
                    this.state.gameData.splice(row, 1, [0,0,0,0,0,0,0,0,0])
                    col=0
                    row--
                    break
                } else {
                    gameData[row].splice(col, 1, num)
                }
            }
        }
        console.log(gameData)
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    isConflict = (row, col, num) => {
        let {gameData} = this.state;
        return gameData[row].includes(num) || Array.from(gameData.map(r => r[col])).includes(num)
    }

    getNoConflictNumber(row, col) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let num = numbers.splice(this.getRandomInt(numbers.length), 1)
        console.log('Numbers: ' + numbers)
        console.log('Number: ' + num[0] + " Row: " + row + " Col: " + col + ' Conflict: ' + this.isConflict(row, col, num[0]))
        while (this.isConflict(row, col, num[0])) {
            if (numbers.length > 0) {
                num = numbers.splice(this.getRandomInt(numbers.length), 1)
                console.log('Numbers: ' + numbers)
                console.log('Number: ' + num[0] + " Row: " + row + " Col: " + col + ' Conflict: ' + this.isConflict(row, col, num[0]))
            } else {
                num = [0]
                break
            }

        }
        return num[0]
    }
}

export default App;