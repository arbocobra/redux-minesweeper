import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCells, selectCells } from './cellSlice';
import { Cell } from '../components/Cell';

export const Cells = (props) => {

    const {size, mines, setGameState} = props;
    const dispatch = useDispatch();

    const cells = useSelector(selectCells);
    const dispatchArgs = {size, mines}

    useEffect(() => {
        dispatch(createCells(dispatchArgs));
    }, [dispatch]);

    return (
        cells.map(cell => <Cell key={cell.id} cell={cell} mines={mines} setGameState={setGameState} />)
    )
}