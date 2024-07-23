import React, {useState, useEffect, useRef} from 'react';

const GameOver = (props) => {
   const { value, resetGame } = props
   
   if (value === 'win') return (
      <div id='end-game' className='game-over-container'>
         <div className='game-over win'>
            <h2>Game Over</h2>
            <h1>You Win</h1>
            <div onClick={() => resetGame()} className='button-init'>Start Over</div>
         </div>
      </div>
   ) 
   else if (value === 'lose') return (
      <div id='end-game' className='game-over-container'>
         <div className='game-over lose'>
            <h2>Game Over</h2>
            <h1>You Lose</h1>
            <div onClick={() => resetGame()} className='button-init'>Start Over</div>
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

export default GameOver