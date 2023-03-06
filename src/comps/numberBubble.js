import React, { Component } from "react";
import "./styles/bubbleRing.scss";
import { connect } from "react-redux";
import { onCellChange } from "./redux/actions/actions";

class NumberBubble extends Component {
  render() {
    const { cell, number, changeCellNumberFromInput } = this.props;
    //console.log(this.props);
    return (
      <div className="NumberBubble">
        <div
          onClick={() => {
            changeCellNumberFromInput(number, cell);
          }}
        >
          {number === null ? "x" : number}
        </div>
      </div>
    );
  }
}

function mapActionsToProps(dispatch) {
  return {
    changeCellNumberFromInput: (value, cell) =>
      dispatch(onCellChange(value, cell)),
  };
}

export default connect(null, mapActionsToProps)(NumberBubble);
