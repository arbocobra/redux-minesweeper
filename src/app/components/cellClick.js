// import React, {useState, useEffect} from 'react';
// import { useSelector, dispatch, useDispatch } from 'react-redux';
// import { toggleFlag, openCell, selectCells } from '../features/cellSlice';
// import { styleCell, styleSpan } from './componentStyles';
// import bomb from '../../images/bomb-red.png';
// import flagR from '../../images/flag-red.png';
// import flagG from '../../images/flag-green.png';

const cellClick = (cell, setGameState, e) => {


    // const {column, flagged, id, mined, minedNeighbourCount, neighbours, opened, row } = cell;
    // console.log(cell)
    // console.log(setGameState)
    // console.log(e);
    if (e.which === 1) {
        console.log(`Left click`)
        if (cell.mined) {
            console.log('boom')
        } else {
            e.target.classList.add('open')
        }
    }
    if (e.which === 3) {
        console.log(`Right click`)
    }

}

export default cellClick;