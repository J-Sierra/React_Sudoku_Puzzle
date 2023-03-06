import React, { Component } from "react";
import "./comps/styles/app.scss";
import { connect } from "react-redux";
import { newGame, setDifficulty } from "./comps/redux/actions/actions";
import Gameboard from "./comps/gameboard";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

class App extends Component {
  state = { gameCounter: 0, canClickNewGame: true };

  render() {
    return (
      <div className="App">
        <header className="Header">
          <nav className="nav">
            <div id="logo">
              <strong
                onClick={(e) => {
                  e.preventDefault();
                  window.location.replace("/#");
                }}
              >
                Sudoku
              </strong>
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
              href="https://www.linkedin.com/in/johnny-sierra/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineLinkedin />
            </a>
            <a
              href="https://github.com/J-Sierra"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineGithub />
            </a>
            <div className="afterBar" />
          </div>
          <div className="emailTo">
            <div id="link">https://github.com/J-Sierra/React_Sudoku_Puzzle</div>
            <div className="afterBar" />
          </div>
          <footer>
            <p>Designed and developed by Johnny Sierra</p>
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
