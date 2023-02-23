import React from 'react';
import "./styles/sector.scss"
import Cell from "./cell";

function Sector(props) {

        let {sector} = props
        return (
            <div className="sectors">
                {sector.map((cell, key) =>
                    <Cell
                        cell={cell}
                        key={key*Math.random()}
                    />
                )}
            </div>
        );

}

export default Sector;