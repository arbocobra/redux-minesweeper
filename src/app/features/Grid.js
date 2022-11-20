import React, {useState, useEffect} from 'react';
import { selectGrid } from './gridSlice';
import { Cells } from './Cells';
import { Cell } from '../components/Cell';
import { useSelector, useDispatch } from 'react-redux';
import { styleGrid } from '../components/componentStyles';
import { createCells, openCell, selectCells } from './cellSlice';

export const Grid = (props) => {
    const {setGameState} = props;
    const dispatch = useDispatch();
    const grid = useSelector(selectGrid);

    const size = grid.size;
    const mines = grid.mines;

    const gridStyle = styleGrid(size);

    const dispatchArgs = {size, mines}

    useEffect(() => {
        dispatch(createCells(dispatchArgs));
    }, [dispatch]);

    const cells = useSelector(selectCells);
    // const openState = cells.map(cell => ({id: cell.id, open: cell.opened}))
    const openState = cells.map(cell => (cell.opened))
    // const [openCells, setOpenCells] = useState({});

    return (
        <div id='grid' className='grid-container' style={gridStyle}>
            <Cells size={size} mines={mines} setGameState={setGameState} openState={openState} />
            {/* {cells.map(cell => <Cell key={cell.id} cell={cell} mines={mines} setGameState={setGameState} />)} */}
        </div>
    )
}