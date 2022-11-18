import React, { useState, useEffect } from 'react';
import cellSlice, { loadCells, createCells, addMines, findNeighbours, mineNeighbours, selectCells } from './cellSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Cell } from '../components/Cell';

export const Cells = (props) => {
    const {size, mines} = props;
    const dispatch = useDispatch();

    // const [cellsCalled, setCellsCalled] = useState(false);
    // const [cellsMined, setCellsMined] = useState(false);
    // const [neighboursCalled, setNeighboursCalled] = useState(false);
    // const [neightboursMined, setNeighboursMined] = useState(false);

    const cells = useSelector(selectCells);
    const dispatchArgs = {size, mines}

    useEffect(() => {
        dispatch(createCells(dispatchArgs));
        // setCellsCalled(true)
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(loadCells(size));
    //     setCellsCalled(true)
    // }, [dispatch]);


    // useEffect(() => {
    //     console.log('useEffect => getMines')
    //     setTimeout(() => {
    //         getMines()
    //         // if (cells.length === Math.pow(size, 2) && cellsCalled) {
    //         //     dispatch(addMines({size, mines}));
    //         //     setCellsMined(true);
    //         // }
    //     }, 1500);
    // }, [cellsCalled])

    // useEffect(() => {
    //     console.log('useEffect => getNeighbours')
    //     setTimeout(() => {
    //         getNeighbours()
    //         // if (cellsMined) {
    //         //     dispatch(findNeighbours(size));
    //         //     setNeighboursCalled(true)
    //         // }
    //     }, 1500);
    // }, [cellsMined])

    // useEffect(() => {
    //     console.log('useEffect => getNeighbourMines')
    //     setTimeout(() => {
    //         getNeighbourMines()
    //         // if (neighboursCalled) {
    //         //     dispatch(mineNeighbours());
    //         //     setNeighboursMined(true)
    //         // }
    //     }, 1500);
    // }, [neighboursCalled])
    
    
    // const getMines = () => {
    //     if (cells.length === Math.pow(size, 2) && cellsCalled) {
    //         console.log('dispatch => addMines')
    //         dispatch(addMines({size, mines}));
    //         setCellsMined(true);
    //     }
    // }

    // const getNeighbours = () => {
    //     if (cellsMined) {
    //         console.log('dispatch => findNeighbours')
    //         dispatch(findNeighbours(size));
    //         setNeighboursCalled(true)
    //     }
    // }

    // const getNeighbourMines = () => {
    //     if (neighboursCalled) {
    //         console.log('dispatch => mineNeighbours')
    //         dispatch(mineNeighbours());
    //         setNeighboursMined(true)
    //     }
    // }

    // if (neightboursMined) {
    //     return (
    //         cells.map(cell => <Cell key={cell.id} id={cell.id}/>)
    //     )
    // }
    
}