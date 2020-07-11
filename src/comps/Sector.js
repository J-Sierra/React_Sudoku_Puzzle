import React, {Component} from 'react';
import "./styles/regions.css"
import Cell from "./cell";

class Sector extends Component {

    render() {
        let {sector} = this.props
        return (
            <div className="regions">
                {sector.map((cell, key) =>
                    <Cell
                        cell={cell}
                        key={key}
                    />
                )}
            </div>
        );
    }

}

export default Sector;