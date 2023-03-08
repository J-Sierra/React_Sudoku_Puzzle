import React, { Component } from "react";
import "./styles/cell.scss";
import { connect } from "react-redux";
import BubbleRing from "./bubbleRing";
import { CellNote } from "./cellNotes";
import {
  handleCellSelectedHighlight,
  toggleEditing,
} from "./redux/actions/actions";

class Cell extends Component {
  state = {
    editing: false,
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
      console.log("toggle off");
      this.setState({ editing: false });
    }
  };

  render() {
    const { editable, number, notesArray, selected } = this.props.cell;
    const { editing } = this.state;

    return (
      <div
        ref={(el) => (this.cellRef = el)}
        className={`${editable ? "cell" : "boldCell"}${
          selected ? " Selected" : ""
        }`}
        onClick={this.toggle}
      >
        {!editing ? number : null}
        {editing && <BubbleRing cell={this.props.cell} />}

        <div className={"cellNoteContainer"}>
          {editable &&
            editing &&
            notesArray.map((note, key) => (
              <div
                style={{ visibility: !number ? "visible" : "hidden" }}
                key={key}
              >
                <CellNote
                  key={key}
                  note={note}
                  cell={this.props.cell}
                  onClick={(event) => event.stopPropagation()}
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
                onClick={(event) => event.stopPropagation()}
              >
                {note.cellNoteNumber}
              </span>
            ))}
        </div>
      </div>
    );
  }

  toggle = () => {
    const { cell, handleCellSelectedHighlight, toggleEditing } = this.props;
    if (cell.editable) {
      console.log("CASE: Cell is empty and editable");
      toggleEditing(cell, true);
      handleCellSelectedHighlight(cell, true);
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
function mapActionsToProps(dispatch) {
  return {
    handleCellSelectedHighlight: (cell, selected) =>
      dispatch(handleCellSelectedHighlight(cell, selected)),
    toggleEditing: (cell, editing) => dispatch(toggleEditing(cell, editing)),
  };
}
export default connect(mapStateToProps, mapActionsToProps)(Cell);
