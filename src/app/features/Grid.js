import React from 'react';
import { selectGrid } from './gridSlice';
import { Cells } from './Cells';
// import { setCells, selectCells } from '../features/cellSlice';
import { useSelector } from 'react-redux';
import { styleGrid } from '../components/componentStyles';

export const Grid = () => {
    const grid = useSelector(selectGrid);
    const square = grid.size;

    const gridStyle = styleGrid(square);

    return (
        <div id='grid' className='grid-container' style={gridStyle}>
            <Cells size={grid.size} mines={grid.mines} />
        </div>
    )

}