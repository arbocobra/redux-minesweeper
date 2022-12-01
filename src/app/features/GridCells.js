import React, { useEffect, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCells, selectGame } from './gameSlice';
import { SingleCell } from './SingleCell';

export const GridCells = (props) => {
    const { countFlags, flaggedCells, setGameLoss } = props;

    const GAME = useSelector(selectGame);
    const gridSize = GAME.square;

    const initialState = Array(gridSize).fill({ opened: false, flagged: false, content: '' })

    const [CELLS, setCELLS] = useState(initialState)
    const [activeCell, setActiveCell] = useState(null)
    // const [correctFlags, setCorrectFlags] = useState([]);
    
    const [loop, setLoop] = useState([false, null]);
    const [reiterateList, setReiterateList] = useState([])
    const [shouldUpdate, setShouldUpdate] = useState([])
    const [allNeighbours, setAllNeighbours] = useState([])
    const [currentNeighbours, setCurrentNeighbours] = useState(null)

    const inputCell = async (id, click) => {
        console.log(id)
        let cell = GAME.cells[id];
        if (click === 1) {
            setActiveCell([cell, 'left'])
        } else if (click === 3) {
            setActiveCell([cell, 'right'])
        } else {
            setActiveCell([cell, 'left'])
        }
        setShouldUpdate(current => [...current, 'x'])
    }

    useEffect(() => {
        console.log('useEffect: shouldUpdate')
    }, [shouldUpdate])


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
                        // const availableNeighbours = cell.neighbours.filter(n => !CELLS[n].opened && !CELLS[n].flagged ? n : null);
                        const availableNeighbours = cell.neighbours.filter(n => !CELLS[n].opened && !CELLS[n].flagged && !reiterateList.includes(n) ? n : null);
                        
                        
                        openClick(id, false, availableNeighbours)
                        setCurrentNeighbours(availableNeighbours)
                    }
                    setLoop([true, null])
                }
            }
            if (click === 'right') {
                let unFlag = CELLS[id].flagged
                flagClick(id, unFlag)
            }
            if (click === 'reiterate') {
                console.log(`${id} was recalled!`)
                // setLoop([true, null])
                // openClick(id, false, null, true);

                if (cell.minedNeighbourCount > 0) {
                    openClick(id, false)
                } else {
                        const availableNeighbours = cell.neighbours.filter(n => !CELLS[n].opened && !CELLS[n].flagged && !reiterateList.includes(n) ? n : null);

                        openClick(id, false, availableNeighbours, true);

                }
                setLoop([true, null])
            }      
        } 
        return () => setActiveCell(null)
        
    }, [shouldUpdate])

    const openClick = (id, mined, neighbours, test) => {        
        if (mined) {
            setCELLS(current => current.map((cell, i) => i === id ? { ...cell, content: 'mine', opened: true } : cell))
        } else {
            if (!neighbours) {
                setCELLS(current => current.map((cell, i) => i === id ? { ...cell, content: 'number', opened: true } : cell))
            } else {
                if (neighbours.length > 0) {
                    
                    // setReiterateList(current => {
                    //     let combine = [current, neighbours];
                    //     return combine.flat();
                    // })                    
                } 
                setCELLS(current => current.map((cell, i) => i === id ? { ...cell, content: 'blank', opened: true } : cell))
                
            }
        } 
    }

    const flagClick = (id, bool) => {
        let content;
        if (bool) {
            console.log('already flagged')
            content = 'unflag'
            // setCELLS(current => current.map((cell, i) => i === id ? { ...cell, flagged: false } : cell))
        } else { content = 'flag'}
        setCELLS(current => current.map((cell, i) => i === id ? { ...cell, content, flagged: !cell.flagged } : cell))
    }

    useEffect(() => {
        console.log('useEffect: currentNeighbours')
        loopClick();
        return () => setCurrentNeighbours(null)
    }, [currentNeighbours])

    const loopClick = () => {
        if (currentNeighbours) {
            setAllNeighbours(current => {
                let combine = [current, currentNeighbours];
                return combine.flat();
            })
        }
    }


    useEffect(() => {
        if (!activeCell && loop[0]) {
            if (!loop[1] && reiterateList.length > 0) {
                console.log(reiterateList)
                let id = reiterateList[0]
                let update = [...reiterateList]
                update.shift();
                setReiterateList(update)
                setLoop([true, id])
            }
        } 
    },[activeCell])


    useEffect(() => {
        if (loop[1]) {
            console.log('useEffect used: loop')
            inputCell(loop[1])
        } else {
            console.log('useEffect not used: loop')
        }
    }, [loop])

    // const clearLoop = () => setLoop()

    return (
        GAME.cells.map(cell => (<SingleCell key={cell.id} cell={cell} inputCell={inputCell} cellContent={CELLS[cell.id].content} />))
    )
}