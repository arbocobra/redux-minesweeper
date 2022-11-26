import React from 'react';
import { GameOptions } from './GameOptions';
import { startGame } from './gameSlice';
import { useDispatch } from 'react-redux';

export const CreateGame = (props) => {

    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(startGame({size: 10, level: 'medium'}))
    }

    return (
        <div className='createGrid-container'>
                <GameOptions handleSubmit={handleSubmit} />
        </div>
    )
}