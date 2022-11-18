import React from 'react';
import { selectGrid } from './gridSlice';
import { Cells } from './Cells';
// import { setCells, selectCells } from '../features/cellSlice';
import { useSelector } from 'react-redux';
import { styleGrid } from '../components/componentStyles';

export const Grid = (props) => {
    const {setGameState} = props;
    const grid = useSelector(selectGrid);
    const size = grid.size;

    const gridStyle = styleGrid(size);

    return (
        <div id='grid' className='grid-container' style={gridStyle}>
            <Cells size={grid.size} mines={grid.mines} setGameState={setGameState} />
        </div>
    )

}