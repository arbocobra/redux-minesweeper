import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createCells, selectGame } from '../features/gameSlice';

import { Grid } from '../features/Grid';

export const PlayGame = (props) => {
    const {setGameWon, setGameLoss} = props;

    const dispatch = useDispatch();
    const GAME = useSelector(selectGame);

    const size = GAME.size;
    const mines = GAME.mines;
    const info = {size, mines};

    useEffect(() => {
        dispatch(createCells(info))
    }, [dispatch])

    if (GAME.cells.length !== 0) {
        return (
            <div id='game' className='game-container'>
                <Grid size={size} mines={mines} setGameWon={setGameWon} setGameLoss={setGameLoss} />
            </div>
        )
    } else { return null}
}