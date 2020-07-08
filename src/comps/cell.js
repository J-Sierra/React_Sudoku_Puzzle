import React, {Component} from 'react';
import "./styles/cell.css"

class Cell extends Component {
    state={
        backgroundColor: "white",
        row:0,
        column:0,
        region:0
    }

    handleClick=()=>{
        if (this.state.backgroundColor === "white") {
            this.setState({
                 backgroundColor: "red"
            });
        }
        else {
            this.setState({
                backgroundColor: "white"
            })
        }
    }

    render() {
        return (
            <div className="cell" onClick={()=>{this.handleClick()}} style={{backgroundColor: this.state.backgroundColor}}>
                {this.props.cNumber}
            </div>
        );
    }
}

export default Cell;