import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CreateGame } from './CreateGame';
import { AltGrid } from './AltGrid';
import { Win } from '../../components/Win';
import { Loss } from '../../components/Loss';
import { changeGameStatus, selectGame } from './gameSlice';

export const AltGame = () => {
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
            <AltGrid setGameWon={setGameWon} setGameLoss={setGameLoss} />
            )
    } else if (game.status === 'win') {
        return (
            <Win />
            )        
    } else if (game.status === 'loss') {
        return (
            <Loss />
            )
    }

    //     return (
    //         <>
    //             <CreateGame />
    //             <AltGrid />
    //             <Win />
    //             <Loss />
    //         </>
    // )

}