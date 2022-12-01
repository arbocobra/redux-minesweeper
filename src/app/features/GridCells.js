import React, { useEffect, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGame } from './gameSlice';
import { SingleCell } from './SingleCell';

export const GridCells = (props) => {
    const { countFlags, setGameLoss, setGameWon } = props;

    const GAME = useSelector(selectGame);
    const gridSize = GAME.square;

    const initialState = Array(gridSize).fill({ opened: false, flagged: false, content: '' })

    const [CELLS, setCELLS] = useState(initialState)
    const [activeCell, setActiveCell] = useState(null)
    const [correctFlags, setCorrectFlags] = useState(0);

    const inputCell = (id, click) => {
        let cell = GAME.cells[id];
        if (click === 1) {
            setActiveCell([cell, 'left'])
        } else if (click === 3) {
            setActiveCell([cell, 'right'])
        } else {
            setActiveCell([cell, 'left'])
        }
    }

    useEffect(() => {
        if (activeCell) {
            const cell = activeCell[0];
            const click = activeCell[1]
            const id = cell.id
            if (click === 'left') {
                if (cell.mined) openClick(id, true)
                else {
                    if (cell.minedNeighbourCount > 0) {
                        openClick(id, false)
                    } else {
                        const availableNeighbours = cell.neighbours.filter(n => !CELLS[n].opened && !CELLS[n].flagged ? n : null);
                        openClick(id, false, availableNeighbours)
                    }
                }
            }
            if (click === 'right') {
                let unFlag = CELLS[id].flagged
                flagClick(id, unFlag)
            } 
        } 
        return () => setActiveCell(null)
        
    }, [activeCell])

    const openClick = (id, mined, neighbours, test) => {        
        if (mined) {
            setCELLS(current => current.map((cell, i) => i === id ? { ...cell, content: 'mine', opened: true } : cell))
        } else {
            if (!neighbours) {
                setCELLS(current => current.map((cell, i) => i === id ? { ...cell, content: 'number', opened: true } : cell))
            } else {
                setCELLS(current => current.map((cell, i) => i === id ? { ...cell, content: 'blank', opened: true } : cell))
            }
        } 
    }

    const flagClick = (id, hasFlag) => {
        const isCorrect = GAME.cells[id].mined
        if (hasFlag) {
            countFlags('remove');
            if (isCorrect) {
                setCorrectFlags(current => current - 1)
            }
            setCELLS(current => current.map((cell, i) => i === id ? { ...cell, content: 'unflag', flagged: !cell.flagged } : cell))
        } else { 
            countFlags('add');
            if (isCorrect) {
                setCorrectFlags(current => current + 1)
            }
            setCELLS(current => current.map((cell, i) => i === id ? { ...cell, content: 'flag', flagged: !cell.flagged } : cell))
        }
        if (correctFlags === GAME.mines) {
            setGameWon(true)
        }
    }

    return (
        GAME.cells.map(cell => (<SingleCell key={cell.id} cell={cell} inputCell={inputCell} cellContent={CELLS[cell.id].content} />))
    )
}