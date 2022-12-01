import React from 'react';
import { useDispatch } from 'react-redux';
import { resetGame } from '../features/gameSlice';

import bombIcon from '../../images/bomb-red.png';

export const LoseGame = () => {

    const dispatch = useDispatch();
    const handleSubmit = () => dispatch(resetGame);

    const bomb = <img src={bombIcon} height='24' width='24' />;

    return (
        <div className="win-loss-container lose">
            <h1>You Lost {bomb}</h1>
            <div className='submit-button' onClick={() => handleSubmit()}>Play Again?</div>
        </div>
    )
}