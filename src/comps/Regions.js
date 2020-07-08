import React, {Component} from 'react';
import "./styles/regions.css"
import Cell from "./cell";

class Regions extends Component {
    state={
        regionData:[1,2,3,4,5,6,7,8,9]
    }
    render() {
        return (
            <div className="regions">
                {this.state.regionData.map(cNumber=>{
                    return (
                        <Cell cNumber={cNumber}/>
                    )
                })}
            </div>
        );
    }
}

export default Regions;