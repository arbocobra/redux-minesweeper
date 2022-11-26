import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import cellSlice from '../cellSlice';
import { openCell, toggleFlag, selectCells } from './gameSlice';
import { SingleCell } from './SingleCell';

export const GridCells = (props) => {
    const { isFlag, flaggedCells, setGameLoss } = props;

    const CELLS = useSelector(selectCells);  
    const dispatch = useDispatch();

    const allContent = Array(CELLS.length).fill('');
    const [cellContent, setCellContent] = useState(allContent);
    const [openedCells, setOpenedCells] = useState([]);
    
    // const selectFilteredNeighbours = (id => {
    //     const neighbours = useSelector(state => state.cells[id].neighbours);
    //     const cellState = useSelector(selectCells)
    //     return neighbours.filter(n => cellState)
    // })

    // const [activeID, setActiveID] = useState(null);
    // const [openState, setOpenState] = useState([]);
    // const [flaggedState, setFlagged] = useState([]);
    // const [activeCell, setActiveCell] = useState()

    const updateCellContent = (id, type) => {
        setCellContent(prev => prev.map((el, i) => i === id ? type : el))
    }

    // const filterNeighbours

    const inputCell = (id, click) => {
        let cell = CELLS[id];
        if (click === 1) {
            setOpenedCells(openedCells.push(id))
            dispatch(openCell(id));
            if (cell.mined) {
                updateCellContent(id, 'mine');
                setGameLoss(true)
            } else if (cell.minedNeighbourCount > 0) {
                updateCellContent(id, 'number');
            } else if (cell.minedNeighbourCount === 0) {
                const neighbours = cell.neighbours;
                const unopenedNeighbours = neighbours.filter(n => !openedCells.includes(n)).filter(n => !flaggedCells.includes(n));
                // const openCells = useSelector(selectOpenCells);
                // const unopenedNeighbours = neighbours.filter(n => !CELLS[n].open);
                // console.log(cell.opened)
                // const unopenedNeighbours = dispatch(filterNeighbours(id));
                // console.log(unopenedNeighbours);
                updateCellContent(id, 'blank');
                unopenedNeighbours.forEach(n => inputCell(n, 1))
            }
        }
        if (click === 3) {
            dispatch(toggleFlag(id));
            updateCellContent(id, 'flag');
            if (cell.mined) {
                isFlag(id, true)
            } else { isFlag(id, false) }
        }
    }






 

 

    // on click
    // - right
    // -- flag
    // --- (final flag? etc)
    // - left
    // -- open
    // --- mined?
    // ----> loss
    // --- neighbours?
    // ----> open + display mined neighbour count
    // ---  no neighbours?
    // ----> open all neighbours, repeat call on each neighbour

    return (
        CELLS.map(cell => (<SingleCell key={cell.id} cell={cell} inputCell={inputCell} cellContent={cellContent[cell.id]} />))
    )
}