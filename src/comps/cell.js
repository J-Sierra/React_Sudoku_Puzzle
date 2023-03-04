import React, { Component } from "react";
import "./styles/cell.scss";
import { connect } from "react-redux";
import BubbleRing from "./bubbleRing";
import CellNote from "./cellNotes";

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
    const { editable, number, notes } = this.props.cell;
    const { selected, editing } = this.state;

    return (
      <div
        ref={(el) => (this.cellRef = el)} // Save a reference to the cell div
        className={editable ? "cell" : "boldCell"}
        style={selected ? { backgroundColor: "gray" } : null}
        onClick={this.toggle}
      >
        {!editing ? number : null}
        {editing && <BubbleRing cell={this.props.cell} />}

        <div className={"cellNoteContainer"}>
          {editable &&
            editing &&
            notes.map((note, key) => (
              <CellNote key={key} note={note}></CellNote>
            ))}
        </div>
      </div>
    );
  }

  toggle = () => {
    const { editing, selected } = this.state;

    if (this.props.cell.editable) {
      this.setState({ editing: !editing, selected: !selected });
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
