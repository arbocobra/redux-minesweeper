import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCells, selectCells } from './cellSlice';
import { Cell } from '../components/Cell';

export const Cells = (props) => {

    const {size, mines, setGameState, openState} = props;
    // const dispatch = useDispatch();

    const cells = useSelector(selectCells);
    const cellsOpen = [...openState]
    const [openCells, setOpenCells] = useState(cellsOpen);
    
    // const dispatchArgs = {size, mines}

    // useEffect(() => {
    //     dispatch(createCells(dispatchArgs));
    // }, [dispatch]);

    return (
        cells.map(cell => <Cell key={cell.id} cell={cell} mines={mines} setGameState={setGameState} />)
    )
}