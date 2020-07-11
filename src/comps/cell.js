import React, {Component} from 'react';
import "./styles/cell.css"

class Cell extends Component {
    state = {
        backgroundColor: "white",

    }

    handleClick = () => {
        if (this.state.backgroundColor === "white") {
            this.setState({
                backgroundColor: "red"
            });
        } else {
            this.setState({
                backgroundColor: "white"
            })
        }
    }

    render() {
        let {cell} = this.props
        let cellData = cell[0]
        let row = cell[1]
        let col = cell[2]

        return (
            <div className="cell" onClick={() => {
                this.handleClick()
            }} style={{backgroundColor: this.state.backgroundColor}}>
                {cellData ? cellData : null}
            </div>
        );
    }
}

export default Cell;