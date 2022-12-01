import React from 'react';
import { useDispatch } from 'react-redux';
import { resetGame } from '../features/gameSlice';

import flagIcon from '../../images/flag-green.png';

export const WinGame = () => {
    
    const dispatch = useDispatch();
    const handleSubmit = () => dispatch(resetGame);

    const flag = <img src={flagIcon} height='24' width='24' />;

    return (
        <div className="win-loss-container win">
            <h1>You Won {flag}</h1>
            <div className='submit-button' onClick={() => handleSubmit()}>Play Again?</div>
        </div>
    )
}