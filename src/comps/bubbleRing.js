import React, { Component } from "react";
import NumberBubble from "./numberBubble";
import "./styles/bubbleRing.scss";

class BubbleRing extends Component {
  render() {
    let { cellChange } = this.props;
    return (
      <div id="BubbleRing">
        {Array.from(Array(9).keys()).map((e, i) => (
          <NumberBubble
            cell={this.props.cell}
            cellChange={cellChange}
            number={i + 1}
            key={i}
          />
        ))}

        <NumberBubble props={this.props} number={"X"} />
      </div>
    );
  }
}

export default BubbleRing;
