import React, {Component} from 'react';
import NumberBubble from "./numberBubble";
import './styles/bubbleRing.scss'

class BubbleRing extends Component {


    render() {
        let {cellChange} = this.props
        return (
            <div id='BubbleRing'>

                {Array.from(Array(9).keys()).map((e, i) =>
                    <NumberBubble
                        cellChange={cellChange}
                        number={i + 1}
                        key ={i*Math.random()}/>
                )}

                <NumberBubble
                    props={this.props}
                    number={'X'}/>
            </div>
        )
    }
}

export default BubbleRing;