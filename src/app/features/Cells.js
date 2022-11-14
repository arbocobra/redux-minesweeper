import React, { useEffect } from 'react';
import { setCells, selectCells } from './cellSlice';
import { useSelector, useDispatch } from 'react-redux';

export const Cells = (props) => {
    const {size, mines} = props;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setCells({size, mines}))
    }, [dispatch]);

    const cells = useSelector(selectCells);

    return (
        cells.map(cell => <div>{cell.id}</div>)
    )



}