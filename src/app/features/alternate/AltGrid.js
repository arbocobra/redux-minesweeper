import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCells, changeGameStatus, selectGame } from './gameSlice';
import { GridCells } from './GridCells';
import { FlagCount } from './FlagCount';
import { styleGrid } from './styleObjects';

export const AltGrid = (props) => {
    const {setGameWon, setGameLoss} = props;

    const dispatch = useDispatch();
    const game = useSelector(selectGame);

    const [correctFlags, setCorrectFlags] = useState([]);
    const [flaggedCells, setFlaggedCells] = useState([]);

    const size = game.size;
    const mines = game.mines;
    const info = {size, mines};
    const gridStyle = styleGrid(size);

    const isFlag = (id, correct) => {
        setFlaggedCells(current => [...current, id])
        if (correct) {
            setCorrectFlags(current => [...current, id])
            if (correctFlags === mines) {
                setGameWon(true)
            }
        }
    } 
    
    
    // if (correctFlags === mines) {
    //     setGameWon(true)
    // }
    

    useEffect(() => {
        dispatch(createCells(info))
    }, [dispatch])

    // if (correctFlags === mines) {
    //     dispatch(changeGameStatus('win'))
    // }

    if (game.cells.length !== 0) {
        return (
            <div id='grid' className='grid-container' style={gridStyle}>
                <GridCells isFlag={isFlag} flaggedCells={flaggedCells} setGameLoss={setGameLoss} />
                <FlagCount mines={mines} flaggedCells={flaggedCells} />
            </div>
        )
    } else { return null}
    
}