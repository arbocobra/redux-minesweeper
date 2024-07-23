import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '../play-game/Grid';
import { setLevel, changeRows, changeColumns, resetGame } from './gameSlice'
import { resetGrid } from '../play-game/gridSlice';
import CreateGame from './CreateGame';

const Game = () => {
   const [activeGame, setActiveGame] = useState(false)
   const dispatch = useDispatch()

   const updateGame = (category, value) => {
      if (category === 'level') dispatch(setLevel(value))
      else if (category === 'row') dispatch(changeRows(value))
      else if (category === 'column') dispatch(changeColumns(value))
   }

   const RESET = () => {
      dispatch(resetGrid())
      dispatch(resetGame())
      setActiveGame(false)
   }
   
   if (!activeGame) {
      return (
         <div className='container'>
            <CreateGame setActiveGame={setActiveGame} updateGame={updateGame} />
         </div>
      )
   } else {
      return (
         <div>
            <Grid RESET={RESET} />
         </div>
      )
   }
}

export default Game