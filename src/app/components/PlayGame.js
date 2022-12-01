import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createCells, selectGame } from '../features/gameSlice';

import { Grid } from '../features/Grid';

export const PlayGame = (props) => {
    const {gameWinLoss} = props;

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
            <Grid size={size} mines={mines} gameWinLoss={gameWinLoss} />
        )
    } else { return null}
}