import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { selectCells } from './gameSlice';

import { styleGrid } from './extras/styleObjects';
import { GridCells } from './GridCells';
import { DisplayFlags } from '../components/DisplayFlags';

export const Grid = (props) => {
    const {size, mines, gameWinLoss} = props;

    const [flags, setFlags] = useState(0);
    
    const gridStyle = styleGrid(size);

    const countFlags = (change) => {
        (change === 'add') ? setFlags(current => current + 1) : setFlags(current => current - 1)
    }

    return (
        <div id='game' className='game-container'>
            <div id='grid' className='grid-container' style={gridStyle}>
                <GridCells countFlags={countFlags} gameWinLoss={gameWinLoss} />
            </div>
            <DisplayFlags mines={mines} flags={flags} />
        </div>
    )
    
}