import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createGrid } from '../features/gridSlice';

export const GameOptions = (props) => {

    const {handleSubmit} = props;

    const gridSize = 10;

    return (
        <div className='createGrid-inner'>
            <div className='grid-title'>
                <h3>Create Mine Field</h3>
            </div>
            <div className='grid-size'>
                Adjust size
                <div className='counter'>
                    <div className='size' >&#60;&nbsp;&#60;</div>
                    <div className='size' >&#60;</div>
                    <div className='size'>{gridSize}</div>
                    <div className='size' >&#62;</div>
                    <div className='size' >&#62;&nbsp;&#62;</div>
                    {/* <div className='size' onClick={()=>decrement(5)}>&#60;&nbsp;&#60;</div>
                    <div className='size' onClick={()=>decrement(1)}>&#60;</div>
                    <div className='size'>{gridSize}</div>
                    <div className='size' onClick={()=>increment(1)}>&#62;</div>
                    <div className='size' onClick={()=>increment(5)}>&#62;&nbsp;&#62;</div> */}
                </div>
            </div>
            <div className='grid-difficulty'>
                Select Difficulty
                <div className='select-level'>
                    <div className='level'>Easy</div>
                    <div className='level'>Medium</div>
                    <div className='level'>Hard</div>
                    {/* <div className='level' onClick={() => selectLevel('easy')}>Easy</div>
                    <div className='level' onClick={() => selectLevel('medium')}>Medium</div>
                    <div className='level' onClick={() => selectLevel('hard')}>Hard</div> */}
                </div>
                <div className='explanation'>Explanation</div>
                {/* <div className='explanation'>{explanation}</div> */}
            </div>
            <div className='grid-submit'>
                {/* <div className='submit-button'>Begin Game</div> */}
                <div className='submit-button' onClick={() => handleSubmit()}>Begin Game</div>
            </div>
        </div>
    )
}