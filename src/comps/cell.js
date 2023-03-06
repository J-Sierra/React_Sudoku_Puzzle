import React, { Component } from "react";
import "./styles/cell.scss";
import { connect } from "react-redux";
import BubbleRing from "./bubbleRing";
import { CellNote } from "./cellNotes";

class Cell extends Component {
  state = {
    editing: false,
    selected: false,
  };

  componentDidMount() {
    // Add event listener to hide BubbleRing when clicking outside the cell
    document.addEventListener("click", this.handleOutsideClick);
  }

  componentWillUnmount() {
    // Remove event listener when component unmounts
    document.removeEventListener("click", this.handleOutsideClick);
  }

  handleOutsideClick = (event) => {
    const { target } = event;
    const { editing } = this.state;
    const isClickInsideCell = this.cellRef.contains(target);
    if (editing && !isClickInsideCell) {
      this.setState({ editing: false });
    }
  };

  render() {
    const { editable, number, notesArray } = this.props.cell;
    const { editing } = this.state;

    return (
      <div
        ref={(el) => (this.cellRef = el)} // Save a reference to the cell div
        className={editable ? "cell" : "boldCell"}
        onClick={this.toggle}
      >
        {!editing ? number : null}
        {editing && <BubbleRing cell={this.props.cell} />}

        <div className={"cellNoteContainer"}>
          {editable &&
            editing &&
            notesArray.map((note, key) => (
              <div style={{ visibility: !number ? "visible" : "hidden" }}>
                <CellNote
                  key={key}
                  note={note}
                  cell={this.props.cell}
                ></CellNote>
              </div>
            ))}
        </div>
        <div className={"cellNoteContainer"}>
          {!editing &&
            !number &&
            this.props.cell.notesArray.map((note) => (
              <span
                className={"cellNoteActive"}
                key={note.cellNoteNumber}
                style={{
                  visibility: note.visible ? "visible" : "hidden",
                  pointerEvents: "none",
                }}
              >
                {note.cellNoteNumber}
              </span>
            ))}
        </div>
      </div>
    );
  }

  toggle = () => {
    const { cell } = this.props;

    if (cell.editable) {
      this.setState((prevState) => ({ editing: !prevState.editing }));
    }
  };
}

const mapStateToProps = (state) => {
  const { gameBoard, sectors, gameBoardReady } = state.gameBoardReducer;
  return {
    gameBoard,
    sectors,
    gameBoardReady,
  };
};

export default connect(mapStateToProps, null)(Cell);
