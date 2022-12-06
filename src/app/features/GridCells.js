import React, { useEffect, useState, useReducer } from 'react';
import { useSelector } from 'react-redux';
import { selectGame } from './gameSlice';
import { SingleCell } from './SingleCell';

export const GridCells = (props) => {
    const { countFlags, gameWinLoss } = props;

    const GAME = useSelector(selectGame);
    const gridSize = GAME.square;

    const initialState = Array(gridSize).fill({ opened: false, flagged: false })

    const [CELLS, setCELLS] = useState(initialState)
    const [cellContent, setCellContent] = useState(null)
    const [loop, setLoop] = useState(false)
    const [loopCell, setLoopCell] = useState(null)
    
    const selectCell = (id, click) => {
        const cell = GAME.cells[id]
        if (click === 0) {
            setCELLS(current => current.map((c, i) => i === id ? { ...c, opened: true } : c))
            if (cell.mined) {
                console.log('mined')
                setCellContent([id, 'mine'])
            }
            else if (cell.minedNeighbourCount > 0) {
                console.log(cell.minedNeighbourCount)
                setCellContent([id, 'number'])
            } else {
                console.log('blank')
                setCellContent([id, 'blank'])
                let result = loopFunc(cell.neighbours)
                console.log('SELECTCELL LOOP RETURNED')
                console.log(result)
                setLoop(result)
            }
        }
        if (click === 2) {
            if (!cell.flagged) {
                console.log('flag')
            } else {
                console.log('unflag')
            }
        }
    }

    const loopFunc = (neighbours) => {
        const neighbourLoop = [...neighbours]
        // console.log(`neighbourLoop: ${neighbourLoop}`)
        const loopArray = [];
        const identifyNeighbours = (id) => {
            // console.log(`identifyNeighbours: ${id}`)
            const gameCells = GAME.cells
            const stateCells = CELLS
            
            if (gameCells[id].minedNeighbourCount > 0) {
                if (!stateCells[id].opened && !stateCells[id].flagged && !loopArray.includes(id)) {
                    loopArray.push(id)
                    // console.log(`add ${id} to loopArray`)
                }
            } else {
                // console.log('else')
                if (!stateCells[id].opened && !stateCells[id].flagged && !loopArray.includes(id)) {
                    loopArray.push(id)
                    GAME.cells[id].neighbours.forEach(c => {
                        if (!stateCells[c].opened && !stateCells[c].flagged && !neighbourLoop.includes(c) && !loopArray.includes(c)) {
                            // console.log(`add ${c} to neighbours`)
                            neighbourLoop.push(c)
                        }
                    })
                } 
            }
            // console.log(`loopArray: ${loopArray}`)
        }
        for (let n of neighbourLoop) {
            identifyNeighbours(n)
        }
        return loopArray;
    }

    // const selectLoop = (arr) => {
    //     console.log('selectLoop')
    //     setLoop(arr)
    //     // for (let id of arr) {
    //     //     const cell = GAME.cells[id]
    //     //     if (cell.minedNeighbourCount > 0) {
    //     //         setCellContent([id, 'number'])
    //     //     } else {
    //     //         setCellContent([id, 'blank'])
    //     //     }
    //     // }
    // }

    // useEffect(() => {
    //     if (loop.length > 0 && !loopCell) { 
    //         const update = [...loop]
    //         const id = update.shift()
    //         console.log(id)
    //         const cell = GAME.cells[id]
    //         setCELLS(current => current.map((c, i) => i === id ? { ...c, opened: true } : c))
    //         setLoop(update)
    //         setLoopCell(id)
    //     }  
    // }, [loop])

    // useEffect(() => {
    //     if (loopCell) {
    //         const cell = GAME.cells[loopCell]
    //         let content = cell.minedNeighbourCount > 0 ? 'number' : 'blank'
    //         // setCellContent([loopCell, content])
    //         console.log(cellContent)
    //     }
    //     return () => setLoopCell(null)
    // }, [loop])

    useEffect(() => {
        (async ( ) => {
            if (loop.length > 0) {
                const update = [...loop]
                const id = update.shift()
                console.log(id)
                setCELLS(current => current.map((cell, i) => i === id ? { ...cell, opened: true } : cell))
                setLoop(update)
                const cell = GAME.cells[id]
                let content = cell.minedNeighbourCount > 0 ? 'number' : 'blank'
                setLoop(update)
                setLoopCell([id, content])
                // console.log(`cellContent: ${loopCell[0]}, ${loopCell[1]}`)
                // // setCellContent([loopCell, content])
                // return () => setCellContent(null)
            }
        })() 
    }, [loop])

    useEffect(() => {
        (async ( ) => {
            if (loopCell) {
                console.log(`cellContent: ${loopCell[0]}, ${loopCell[1]}`)
                setCellContent([loopCell[0], loopCell[1]])
                return () => setLoopCell(null)
            }
        })() 
    }, [loopCell])


    // selectCell (id)
    //  const cell = GAME.cells[id]
    //  IDENTIFY TYPE
    // if left
        // if (cell.mined)
        // else if (cell.minedNeighbourCount > 0)
        // else
        // => UPDATE STATE
    // if right
        // flag
        // unflag
        // => UPDATE STATE




    return (
        <SingleCell selectCell={selectCell} stateCells={GAME.cells} gameCells={CELLS} cellContent={cellContent} setCellContent={setCellContent} />
    )
}