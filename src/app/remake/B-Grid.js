import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGameState } from './A-GameSlice'
import { loadGrid, selectGridState } from './B-GridSlice'
import Cell from './C-Cell';
import { batchSelectNeighbours } from './helperFunctions';
import { styleGrid } from './styleObjects'

const Grid = (props) => {
   const { RESET } = props
   const dispatch = useDispatch()

   const [foundMines, setFoundMines] = useState(0)
   // const [flagCount, setFlagCount] = useState(0)
   const [mineExploded, setMineExploded] = useState(false)
   const [gameOver, setGameOver] = useState(false)

   const flagCount = useRef(0)
   const endValue = useRef(null)

   const gameState = useSelector(selectGameState)
   const CELLS = useSelector(selectGridState)

   useEffect(() => { if (mineExploded) endGame('lose') }, [mineExploded])

   useEffect(() => { if (foundMines === gameState.mines) endGame('win') }, [foundMines])

   useEffect(() => { 
      dispatch(loadGrid(gameState)) 
      document.getElementById('grid').addEventListener('contextmenu', (e) => { e.preventDefault() });
   }, [])

   const multiSelect = (cell) => batchSelectNeighbours([], cell.neighbours, CELLS, [])

   const selectMine = () => setMineExploded(true)

   const placeFlag = (bool, hasMine) => {
      if (bool) {
         flagCount.current += 1;
         if (hasMine) setFoundMines(current => current + 1)
         else {
            if (flagCount.current === gameState.mines) window.alert('wrong flag somewhere')
         }
      } else {
         flagCount.current -= 1;
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
         <div>Mines: {flagCount.current} / {gameState.mines}</div>
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

const GameOver = (props) => {
   const { value, resetGame } = props
   
   if (value === 'win') return (
      <div id='end-game' className='game-over-container'>
         <div className='game-over win'>
            <h2>Game Over</h2>
            <h1>You Win</h1>
         </div>
      </div>
   ) 
   else if (value === 'lose') return (
      <div id='end-game' className='game-over-container'>
         <div className='game-over lose'>
            <h2>Game Over</h2>
            <h1>You Lose</h1>
         </div>
      </div>
   )
   else return (
      <div id='end-game' className='game-over-container'>
         <div className='game-over lose'>
            <h2>Game Over</h2>
            <h1>Game Cancelled</h1>
            <div onClick={() => resetGame()} className='button-init'>Start Over</div>
         </div>
      </div>
   )
}