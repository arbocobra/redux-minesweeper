import React from 'react';
import { GameOptions } from '../features/GameOptions';
import { startGame } from '../features/gameSlice';
import { useDispatch } from 'react-redux';

export const CreateGame = () => {

  const dispatch = useDispatch();

  const handleSubmit = (size, level) => {
    dispatch(startGame({size, level}))
}

  return (
    <div className='createGrid-container'>
      <GameOptions handleSubmit={handleSubmit} />
    </div>
  );
};