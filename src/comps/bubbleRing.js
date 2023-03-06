import React, { Component } from "react";
import NumberBubble from "./numberBubble";
import "./styles/bubbleRing.scss";

class BubbleRing extends Component {
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

export default BubbleRing;
