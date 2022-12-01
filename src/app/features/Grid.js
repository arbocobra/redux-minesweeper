import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectCells } from './gameSlice';

import { styleGrid } from './extras/styleObjects';
import { GridCells } from './GridCells';
import { DisplayFlags } from '../components/DisplayFlags';

export const Grid = (props) => {
    const {size, mines, setGameWon, setGameLoss} = props;

    const [flags, setFlags] = useState(0);
    
    const gridStyle = styleGrid(size);

    const countFlags = (change) => {
        if (change === 'add') {
            setFlags(current => current + 1)
        } 
        if (change === 'remove') {
            setFlags(current => current - 1)
        } 
    }

    useEffect(() => {
        if (flags) {
            console.log(flags)
        }
        
    }, [flags])

    return (
        <div id='grid' className='grid-container' style={gridStyle}>
            <GridCells countFlags={countFlags} setGameLoss={setGameLoss} setGameWon={setGameWon} />
            <DisplayFlags mines={mines} flags={flags} />
        </div>
    )
    
}