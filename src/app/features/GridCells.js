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
    const [cellContent, setCellContent] = useState(undefined)

    const [loop, setLoop] = useState(false)
    const [loopCell, setLoopCell] = useState(undefined)
    // const [clickCell, setClickCell] = useState(undefined)

    const [correctFlags, setCorrectFlags] = useState(0)
    
    const selectCell = (id, click) => {
        const cell = GAME.cells[id]
        id = Number.parseInt(id)
        if (click === 0) {
            // setClickCell([id, 'left'])
            setCELLS(current => current.map((cell, i) => i === id ? { ...cell, opened: true } : cell))
                      
            if (cell.mined) {
                console.log('mined')
                setCellContent([id, 'mine'])
                gameWinLoss('loss')
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
            // setClickCell([id, 'right'])
            const unflag = CELLS[id].flagged
            const isCorrect = cell.mined;
            
            if (unflag) {
                // console.log('unflag')
                setCELLS(current => current.map((cell, i) => i === id ? { ...cell, flagged: false } : cell))
                countFlags('remove');
                setCellContent([id, 'unflag'])
                if (isCorrect) {
                    setCorrectFlags(current => current - 1)
                }
            } else {
                setCELLS(current => current.map((cell, i) => i === id ? { ...cell, flagged: true } : cell))
                countFlags('add');
                setCellContent([id, 'flag'])
                // console.log('flag')
                if (isCorrect) {
                    setCorrectFlags(current => current + 1)
                }
            }
        }
    }

    useEffect(() => {
        if (correctFlags === GAME.mines) {
            gameWinLoss('win')
        }
    }, [correctFlags])

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
                // return () => setLoopCell(null)
                
            }
            return () => clearLoop()
        })() 
    }, [loopCell])

    const clearLoop = () => {
        setLoopCell(null)
        // setCellContent(null)
    }

    


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