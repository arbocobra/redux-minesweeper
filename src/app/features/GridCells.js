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
    const [tempList, setTempList] = useState([])

    const inputCell = async (id, click) => {
        console.log(id)
        let cell = GAME.cells[id];
        if (click === 1) {
            setActiveCell([cell, 'left'])
        } else if (click === 3) {
            setActiveCell([cell, 'right'])
        } else {
            setActiveCell([cell, 'reiterate'])
        }
        setShouldUpdate(current => [...current, id])
    }

    useEffect(() => {
        console.log('useEffect: shouldUpdate')
    }, [shouldUpdate])


    useEffect(() => {
        if (activeCell) {
            // console.log('useEffect used: activeCell - A')
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
                        
                        setLoop([true, null])
                        openClick(id, false, availableNeighbours)
                    }
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
                    // console.log(neighbours)
                    setReiterateList(current => {
                        let combine = [current, neighbours];
                        return combine.flat();
                    })
                    setTempList(current => {
                        let combine = [current, reiterateList];
                        return combine.flat();
                    })
                    
                } 
                setCELLS(current => current.map((cell, i) => i === id ? { ...cell, content: 'blank', opened: true } : cell))
                // setShouldUpdate(current => [...current, 'loop'])
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

    // const allNeighbours = [];
    // const loopOpen = (id, neighbours) => {
    //     if (!neighbours) {
    //         allNeighbours.push([id, 'number'])
    //         // setCELLS(current => current.map((cell, i) => i === id ? { ...cell, content: 'number', opened: true } : cell))
    //     } else {
    //         if (neighbours.length > 0) {
    //             // console.log(neighbours)
    //             setReiterateList(current => {
    //                 let combine = [current, neighbours];
    //                 return combine.flat();
    //             })
    //         } 
    //         setCELLS(current => current.map((cell, i) => i === id ? { ...cell, content: 'blank', opened: true } : cell))
    //         setShouldUpdate(current => [...current, 'loop'])
    //     }
    // }

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