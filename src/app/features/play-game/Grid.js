import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectGameState } from '../begin-game/gameSlice'
import { loadGrid, selectGridState, selectStaticGridState } from './gridSlice'

import Cell from './Cell';
import GameOver from '../end-game/GameOver';
import FlagCount from './FlagCount';

import { batchSelectNeighbours } from '../../functions/helperFunctions';
import { styleGrid } from '../../style/styleObjects'

const Grid = (props) => {
   const { RESET } = props
   const dispatch = useDispatch()

   const [foundMines, setFoundMines] = useState(0)
   const [flagCount, setFlagCount] = useState(0)
   const [mineExploded, setMineExploded] = useState(false)
   const [gameOver, setGameOver] = useState(false)

   // const flagCount = useRef(0)
   const endValue = useRef(null)

   const gameState = useSelector(selectGameState)
   // const CELLS = useSelector(selectGridState) 
   const CELLS = useSelector(selectGridState)

   useEffect(() => { console.log(`GRID rendered`)})

   useEffect(() => { if (mineExploded) endGame('lose') }, [mineExploded])

   useEffect(() => { if (foundMines === gameState.mines) endGame('win') }, [foundMines])

   useEffect(() => { if (flagCount === gameState.mines) window.alert('wrong flag somewhere') }, [flagCount])

   useEffect(() => { 
      dispatch(loadGrid(gameState)) 
      document.getElementById('grid').addEventListener('contextmenu', (e) => { e.preventDefault() });
   }, [])

   // const onKeyDown = (event) => { console.log(event) }
// const onKeyDown = useCallback((event) => { console.log(event) }, [])

   const multiSelect = useCallback((cell) => batchSelectNeighbours([], cell.neighbours, CELLS, []), [CELLS])

   const selectMine = () => setMineExploded(true)

   const placeFlag = (bool, hasMine) => {
      if (bool) {
         setFlagCount(current => current + 1)
         if (hasMine) setFoundMines(current => current + 1)
      } else {
         setFlagCount(current => current - 1)
         if (hasMine) setFoundMines(current => current - 1)
      }
   }

   const endGame = (value) => {
      endValue.current = value
      if (value === 'lose') setTimeout(() => { setGameOver(true) }, 1500)
      else setGameOver(true)
   }

   const gridStyle = styleGrid(gameState.rows, gameState.columns);

   return (
      <div id='game' className='game-container'>
         <FlagCount flags={flagCount} mines={gameState.mines} />
         {/* <div>Mines: {flagCount.current} / {gameState.mines}</div> */}
         <div id='grid' className='grid-container' style={gridStyle}>
            { CELLS.map((val,i) => {
               return <Cell key={i} cellState={val} multiSelect={multiSelect} selectMine={selectMine} placeFlag={placeFlag} bomb={val.mined && mineExploded} />
            }) }
         </div>
         { gameOver ? <GameOver value={endValue.current} resetGame={RESET} /> : null }
         <div onClick={() => endGame('cancel')}>Cancel Game</div>
      </div>
   )
}

export default Grid