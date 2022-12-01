import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CreateGame } from './CreateGame';
import { PlayGame } from './PlayGame';
import { WinGame } from './WinGame';
import { LoseGame } from './LoseGame';
import { changeGameStatus, selectGame } from '../features/gameSlice';

export const Game = () => {
    const game = useSelector(selectGame);
    const dispatch = useDispatch()

    const [gameWon, setGameWon] = useState(false);
    const [gameLoss, setGameLoss] = useState(false);

    useEffect(() => {
        if (gameWon) {
            dispatch(changeGameStatus('win'))
        }
    }, [gameWon])

    useEffect(() => {
        if (gameLoss) {
            dispatch(changeGameStatus('loss'))
        }
    }, [gameLoss])

    const gameWinLoss = (change) => {
        if (change === 'win') setGameWon(true)
        if (change === 'loss') setGameLoss(true)
    }
    

    // if (game.status === 'loading') {
    //     return (
    //         <CreateGame />
    //     )
    // } else if (game.status === 'play') {
    //     return (
    //         <PlayGame gameWinLoss={gameWinLoss} />
    //         )
    // } else if (game.status === 'win') {
    //     return (
    //         <WinGame />
    //         )        
    // } else if (game.status === 'loss') {
    //     return (
    //         <LoseGame />
    //         )
    // } 

    let winLossScreen;
    if (game.status === 'win') winLossScreen = <WinGame />
    else if (game.status === 'loss') winLossScreen = <LoseGame />
    else winLossScreen = null

    if (game.status === 'loading') {
        return (
            <div className='container'>
              <h1>Mineweeper - Redux</h1>
                <CreateGame />
            </div>
            
        )
    } else {
        return (
            <div className='container'>
              <h1>Mineweeper - Redux</h1>
              <PlayGame gameWinLoss={gameWinLoss} />
              { winLossScreen }
            </div>
        )
    }
}