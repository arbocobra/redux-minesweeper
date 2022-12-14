import React, { useState } from 'react';

export const GameOptions = (props) => {
  const { handleSubmit } = props;

  const [explanation, setExplanation] = useState('');
  const [gridSize, setGridSize] = useState(10);
  const [gridLevel, setGridLevel] = useState(null);

  const selectLevel = (level) => {
    if (level === 'easy')
      setExplanation('Easy mine field has 12% mine-density');
    if (level === 'medium')
      setExplanation('Medium mine field has 16% mine-density');
    if (level === 'hard')
      setExplanation('Hard mine field has 21% mine-density');
    setGridLevel(level);
  };

  const increment = (num) => {
    setGridSize(gridSize + num);
  };

  const decrement = (num) => {
    setGridSize(gridSize - num);
  };

  return (
    <div className='createGrid-inner'>
      <div className='grid-title'>
        <h3>Create Mine Field</h3>
      </div>
      <div className='grid-size'>
        Adjust size
        <div className='counter'>
          <div className='size' onClick={() => decrement(5)}>
            &#60;&nbsp;&#60;
          </div>
          <div className='size' onClick={() => decrement(1)}>
            &#60;
          </div>
          <div className='size'>{gridSize}</div>
          <div className='size' onClick={() => increment(1)}>
            &#62;
          </div>
          <div className='size' onClick={() => increment(5)}>
            &#62;&nbsp;&#62;
          </div>
        </div>
      </div>
      <div className='grid-difficulty'>
        Select Difficulty
        <div className='select-level'>
          <div className='level' onClick={() => selectLevel('easy')}>
            Easy
          </div>
          <div className='level' onClick={() => selectLevel('medium')}>
            Medium
          </div>
          <div className='level' onClick={() => selectLevel('hard')}>
            Hard
          </div>
        </div>
        <div className='explanation'>{explanation}</div>
      </div>
      <div className='grid-submit'>
        <div className='submit-button' onClick={() => handleSubmit(gridSize, gridLevel)}>
          Begin Game
        </div>
      </div>
    </div>
  );
};
