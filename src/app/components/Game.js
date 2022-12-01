import React, {useState} from 'react';
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

    if (gameWon) {
        dispatch(changeGameStatus('win'))
    }

    if (gameLoss) {
        dispatch(changeGameStatus('loss'))
    }

    if (game.status === 'loading') {
        return (
            <CreateGame />
        )
    } else if (game.status === 'play') {
        return (
            <PlayGame setGameWon={setGameWon} setGameLoss={setGameLoss} />
            )
    } else if (game.status === 'win') {
        return (
            <WinGame />
            )        
    } else if (game.status === 'loss') {
        return (
            <LoseGame />
            )
    } 
}