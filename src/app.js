import React, { Component } from "react";
import "./comps/styles/app.scss";
import { connect } from "react-redux";
import { newGame, setDifficulty } from "./comps/redux/actions/actions";
import Gameboard from "./comps/gameboard";
import { AiOutlineGithub } from "react-icons/ai";

class App extends Component {
  state = { gameCounter: 0, canClickNewGame: true };

  render() {
    return (
      <div className="App">
        <header className="Header">
          <nav className="nav">
            <div id="logo">
              <strong>Sudoku</strong>
            </div>
            <div id={"gameSettingsContainer"}>
              <div className="navElements">
                <div id={"difficultySettingDropdown"}>
                  <label> Difficulty: </label>
                  <select
                    disabled={!this.state.canClickNewGame}
                    onChange={(e) => this.props.setDifficulty(e.target.value)}
                  >
                    <option value={this.getRandomIntegerWithinRange(36, 45)}>
                      Easy
                    </option>
                    <option value={this.getRandomIntegerWithinRange(46, 55)}>
                      Medium
                    </option>
                    <option value={this.getRandomIntegerWithinRange(56, 65)}>
                      Hard
                    </option>
                  </select>
                </div>
              </div>
              <div className="navElements">
                <div onClick={() => this.handleNewGame()} id={"newGame"}>
                  New Game
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className="App-Container">
          <Gameboard key={this.state.gameCounter} />
          <div className="socials">
            <a
              href="https://github.com/J-Sierra/React_Sudoku_Puzzle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineGithub />
            </a>
            <div className="afterBar" />
          </div>
          <div className="githubRepo">
            <div
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.open("https://www.johnnysierra.com/", "_blank")
              }
              id="link"
            >
              JohnnySierra.com
            </div>
            <div className="afterBar" />
          </div>
          <footer>
            <p>
              Designed and developed by
              <span
                style={{ cursor: "pointer", color: "#ffd500" }}
                onClick={() =>
                  window.open("https://www.johnnysierra.com/", "_blank")
                }
                id="link"
              >
                {" "}
                Johnny Sierra
              </span>
            </p>
          </footer>
        </div>
      </div>
    );
  }

  handleNewGame() {
    if (!this.state.canClickNewGame) {
      return;
    }
    this.setState({ canClickNewGame: false }, () => {
      let { startNewGame, difficulty } = this.props;
      startNewGame();
      console.log("New Game created, current difficulty: ", difficulty);

      this.setState((prevState) => {
        return {
          gameCounter: prevState.gameCounter + 1,
          canClickNewGame: true,
        };
      });
    });
  }

  getRandomIntegerWithinRange(min, max) {
    const floatRandom = Math.random();
    const difference = max - min;
    // random between 0 and the difference
    const random = Math.round(difference * floatRandom);
    return random + min;
  }
}

const mapStateToProps = (state) => ({
  ...state.gameBoardReducer,
});

function mapActionsToProps(dispatch) {
  return {
    startNewGame: () => dispatch(newGame()),
    setDifficulty: (difficulty) => dispatch(setDifficulty(difficulty)),
  };
}

export default connect(mapStateToProps, mapActionsToProps)(App);
