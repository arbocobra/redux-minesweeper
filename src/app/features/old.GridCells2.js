import React, { useEffect, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGame } from './gameSlice';
import { SingleCell } from './SingleCell';

export const GridCells = (props) => {
    const { countFlags, gameWinLoss } = props;

    const GAME = useSelector(selectGame);
    const gridSize = GAME.square;

    const initialState = Array(gridSize).fill({ opened: false, flagged: false })

    const [CELLS, setCELLS] = useState(initialState)
    const [activeCell, setActiveCell] = useState(null)
    const [correctFlags, setCorrectFlags] = useState(0)
    const [cellContent, setCellContent] = useState(null)

    const [loop, setLoop] = useState([false, null]);
    const [neighbourList, setNeighbourList] = useState([])

    const inputCell = (id, click) => {
        let cell = GAME.cells[id];
        if (click === 0) {
            // console.log(`inputCell -> setActiveCell(${cell}, left)`)
            setActiveCell([cell, 'left'])
        } else if (click === 2) {
            // console.log(`inputCell -> setActiveCell(${cell}, right)`)
            setActiveCell([cell, 'right'])
        // } else {
        //     setActiveCell([cell, 'left'])
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
                        // console.log(`useEffect -> openClick(${id}, false)`)
                    } else {
                        const availableNeighbours = findNeighbours(cell.neighbours)
                        // const availableNeighbours = cell.neighbours.filter(n => !CELLS[n].opened && !CELLS[n].flagged && !neighbourList.includes(n) ? n : null);
                        openClick(id, false, availableNeighbours)
                        // console.log(`useEffect -> openClick(${id}, false, ${availableNeighbours})`)
                    }
                }
            }
            if (click === 'right') {
                let unFlag = CELLS[id].flagged
                flagClick(id, unFlag)
                // console.log(`useEffect -> flagClick(${id}, ${unFlag})`)
            } 
        } 
        return () => clearActive();
    }, [activeCell])

    const clearActive = () => {
        setActiveCell(null);
        setCellContent(null)
    }

    const findNeighbours = (neighbourArray) => {
        return neighbourArray.filter(n => !CELLS[n].opened && !CELLS[n].flagged && !neighbourList.includes(n) ? n : null);
    }

    const openClick = (id, mined, neighbours, test) => {    
        // console.log('openClick')    
        if (mined) {
            // console.log(`openClick -> setCELLS(${id} = opened)`)
            setCELLS(current => current.map((cell, i) => i === id ? { ...cell, opened: true } : cell))
            // console.log(`openClick -> setCellContent(mine)`)
            setCellContent([id, 'mine'])
            gameWinLoss('loss')
        } else {
            if (!neighbours) {
                // console.log(`openClick -> setCELLS(${id} = opened)`)
                setCELLS(current => current.map((cell, i) => i === id ? { ...cell, opened: true } : cell))
                // console.log(`openClick -> setCellContent(number)`)
                setCellContent('number')
            } else {
                // console.log(`openClick -> setCELLS(${id} = opened)`)
                setCELLS(current => current.map((cell, i) => i === id ? { ...cell, opened: true } : cell))
                // console.log(`openClick -> setCellContent(blank)`)
                setCellContent('blank')
                // console.log(`openClick -> setNeighbourList(${neighbourList} + ${neighbours})`)
                setNeighbourList(current => [...current, neighbours].flat())
                // console.log(`openClick -> setLoop(true, ${loop[1]})`)
                setLoop(current => [true, current[1]])
            }
        } 
        setCellContent(null)
    }

    const flagClick = (id, hasFlag) => {
        const isCorrect = GAME.cells[id].mined
        if (hasFlag) {
            countFlags('remove');
            if (isCorrect) {
                setCorrectFlags(current => current - 1)
            }
            setCELLS(current => current.map((cell, i) => i === id ? { ...cell, flagged: false } : cell))
            setCellContent('unflag')
        } else { 
            countFlags('add');
            if (isCorrect) {
                setCorrectFlags(current => current + 1)
                if (correctFlags === GAME.mines) {
                    gameWinLoss('win')
                }
            }
            setCELLS(current => current.map((cell, i) => i === id ? { ...cell, flagged: true } : cell))
            setCellContent('flag')
        }
    }

    useEffect(() => {
        if (loop[0] && !loop[1] && !activeCell) {
            for (let n of neighbourList) {
                // console.log(n)
                const cell = GAME.cells[n]
                if (cell.minedNeighbourCount === 0) {
                    let update = findNeighbours(cell.neighbours)
                    update.map(u => neighbourList.push(u))
                }
            }
            // setLoop([false, null])
            // console.log(neighbourList)
            // if (neighbourList.length > 0) {
            //     let update = [...neighbourList]
            //     let id = update[0]
            //     update.shift();
            //     setNeighbourList(update)
            //     setLoop([true, id])
            // }
        }
        // if (!loop[0] && neighbourList > 0) {
        //     // inputCell(loop[1], 1)
        //     // console.log(loop[1])
        //     // return () => resetLoop()
        //     console.log(neighbourList)
        // } 
    }, [loop])

    useEffect(() => {
        if (neighbourList.length > 0) {
            
            let update = [...neighbourList]
            let id = update[0]
            update.shift();
            setNeighbourList(update)
            setLoop([true, id])
        }
        if (loop[1]) {
            
            // console.log(loop[1])
            // console.log(neighbourList)
            inputCell(loop[1], 0)
        }
    }, [neighbourList])

    // useEffect(() => {
    //     if (loop[1]) {
    //         inputCell(loop[1], 1)
    //         // console.log(loop[1])
    //         // return () => resetLoop()
    //         // console.log(loop[1])
    //     } 
    // }, [loop])

    // const resetLoop = () => {
    //     if (loop[1]) {
    //         if (neighbourList.length > 0) {
    //             setLoop([true, null])
    //         } else {
    //             setLoop([false, null])
    //         }
    //     }
    // }



    return (
        <SingleCell inputCell={inputCell} stateCells={GAME.cells} gameCells={CELLS} cellContent={cellContent} activeCell={activeCell} />
    )
}