import React, { Component } from "react";
import NumberBubble from "./numberBubble";
import "./styles/bubbleRing.scss";
import { connect } from "react-redux";
import { handleCellSelectedHighlight } from "./redux/actions/actions";

class BubbleRing extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // Only update if the selected cell has changed
    return nextProps.cell.editing !== this.props.cell.editing;
  }
  componentDidMount() {
    const { cell, handleCellSelectedHighlight } = this.props;
    console.log("TEST: Bubble Ring did mount");
    handleCellSelectedHighlight(cell, true);
  }
  componentWillUnmount() {
    const { cell, handleCellSelectedHighlight } = this.props;
    console.log("TEST: Bubble Ring Unmount");
  }
  render() {
    return (
      <div id="BubbleRing">
        {Array.from(Array(9).keys()).map((e, i) => (
          <NumberBubble cell={this.props.cell} number={i + 1} key={i} />
        ))}
        <NumberBubble props={this.props} cell={this.props.cell} number={"x"} />
      </div>
    );
  }
}

function mapActionsToProps(dispatch) {
  return {
    handleCellSelectedHighlight: (cell, selected) =>
      dispatch(handleCellSelectedHighlight(cell, selected)),
  };
}
export default connect(null, mapActionsToProps)(BubbleRing);
