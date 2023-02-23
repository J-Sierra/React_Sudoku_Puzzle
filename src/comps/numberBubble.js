import React from 'react';
import './styles/numberBubble.scss';
import { useDispatch } from 'react-redux'


function NumberBubble(props) {
    let {number} = props;
    return (
        <div className='NumberBubble'>
            <div>{number}</div>
        </div>
    );

}

export default NumberBubble
