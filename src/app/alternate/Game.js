import React, {useState, useEffect, useRef, useReducer, useCallback, memo} from 'react';
import { Grid } from './Grid';

const _ = require('lodash'); 

const gameReducer = (gameState, action) => {
   switch (action.method) {
      case 'setLevel': {
         return {
            ...gameState,
            level: action.level,
            multiplier: action.multiplier,
            mines: Math.round((gameState.rows * gameState.columns) * action.multiplier)
         }
      }
      case 'changeRows': {
         return {
            ...gameState,
            rows: gameState.rows + action.num < 100 ? gameState.rows + action.num : 99,
            mines: Math.round((gameState.columns * (gameState.rows + action.num)) * gameState.multiplier)
         }
      }
      case 'changeColumns': {
         return {
            ...gameState,
            columns: gameState.columns + action.num < 100 ? gameState.columns + action.num : 99,
            mines: Math.round((gameState.rows * (gameState.columns + action.num)) * gameState.multiplier)
         }
      }
   }
}

export const Game = () => {
   const [activeGame, setActiveGame] = useState(false)
   const [gameState, dispatch] = useReducer(gameReducer, {level: 'medium', rows: 10, columns: 10, mines: 16, multiplier: 0.156 })

   const selectLevel = (val) => {
      dispatch({
         method: 'setLevel',
         level: val < 1 ? 'easy' : val > 1 ? 'hard' : 'medium',
         multiplier: val < 1 ? 0.123 : val > 1 ? 0.208 : 0.156,
      })
   }
   const updateGrid = (val, type) => {
      if (type === 'row') {
         dispatch({
            method: 'changeRows',
            num: val,
         })
      } else {
         dispatch({
            method: 'changeColumns',
            num: val,
         })
      }
   }
   
   if (!activeGame) {
      return (
         <div className='container'>
            <div>Game Not Active</div>
            <CreateGame setActiveGame={setActiveGame} gameState={gameState} selectLevel={selectLevel} updateGrid={updateGrid} />
         </div>
      )
   } else {
      return (
         <div>
            <div>Game Active</div>
            <Grid gameState={gameState} setActiveGame={setActiveGame} />
         </div>
      )
   }
}
export const CreateGame = (props) => {
   const {setActiveGame, gameState, selectLevel, updateGrid} = props;

   useEffect(() => {
      const divArray = document.querySelector('.level-select').childNodes
      divArray.forEach(el => Array.from(el.classList).includes(gameState.level) ? el.classList.add('selected') : el.classList.remove('selected'))
   })

   return (
      <div className='select-container'>
         <div>Game Not Active</div>
         <div className='button-row level-select'>
            <div onClick={() => selectLevel(0)} className='button-init easy'>Easy</div>
            <div onClick={() => selectLevel(1)} className='button-init medium'>Medium</div>
            <div onClick={() => selectLevel(2)} className='button-init hard'>Hard</div>
         </div>
         <div className='button-row'>
         <div className='title-row'>Select Grid Height</div>
            <div onClick={() => updateGrid(-5, 'row')} className='button-init'>&#60;&#60;</div>
            <div onClick={() => updateGrid(-1, 'row')} className='button-init'>&#60;</div>
            <div>{gameState.rows}</div>
            <div onClick={() => updateGrid(1, 'row')} className='button-init'>&#62;</div>
            <div onClick={() => updateGrid(5, 'row')} className='button-init'>&#62;&#62;</div>
         </div>
         <div className='button-row'>
            <div className='title-row'>Select Grid Width</div>
            <div onClick={() => updateGrid(-5, 'column')} className='button-init'>&#60;&#60;</div>
            <div onClick={() => updateGrid(-1, 'column')} className='button-init'>&#60;</div>
            <div>{gameState.columns}</div>
            <div onClick={() => updateGrid(1, 'column')} className='button-init'>&#62;</div>
            <div onClick={() => updateGrid(5, 'column')} className='button-init'>&#62;&#62;</div>
         </div>
         <div className='button-row'>
         <div onClick={() => setActiveGame(true)} className='button-init'>Begin Game</div>
         </div>
      </div>
   )
}