import React, {useState, useEffect} from 'react';

import { styleCell, styleSpan } from './extras/styleObjects';
import bombIcon from '../../images/bomb-red.png';
import flagIcon from '../../images/flag-green.png';

export const SingleCell = (props) => {
    const { selectCell, stateCells, gameCells, cellContent, setCellContent } = props;

    const initialContent = Array(gameCells.length).fill(null)
    const [displayContent, setDisplayContent] = useState(initialContent);
    // const [current, setCurrent] = useState(null)

    const bomb = <img src={bombIcon} height='20' width='20' />;
    const flag = <img src={flagIcon} height='20' width='20' />;

    
    const number = (minedNeighbourCount) => {
        const spanStyle = styleSpan(minedNeighbourCount);
        return (<span style={spanStyle}>{minedNeighbourCount}</span>)
    }

    const CELLS = stateCells.map((cell, i) => (
        {
            id: cell.id,
            content: displayContent[i],
            cellStyle: styleCell(cell.row, cell.column)
        }
    ))

    const handleClick = (event) => {
        event.preventDefault()
        let elementId;
        if (event.target.nodeName === 'IMG') {
            elementId = event.target.parentElement.id
        } else {
            elementId = event.target.id
        }
        selectCell(elementId, event.button)
        // console.log(`handleClick -> inputCell(${elementId}, ${event.button})`)
        // setCurrent(elementId)
    }

    // useEffect(() => {
    //     if (cellContent && activeCell) {
    //         setCurrent(loopCell)
    //     }
    // }, [loopCell])

    // useEffect(() => { 
    //     if (cellContent) { 
    //         // let id;
    //         // if (current) {
    //         //     id = loopCell;
    //         // } else {
    //         //     id = current;
    //         // }
    //         // console.log(activeCell)
    //         // console.log(`useEffect [${cellContent}]`)
    //         // updateContent(activeCell[0].id); 
    //         }
    //         // return () => resetCurrent();
    //     // }
    // }, [cellContent]);

    // const resetCurrent = () => {
    //     setCurrent(null)
    // }

    useEffect(() => {
        (async ( ) => {
            if (cellContent) {
                console.log('useeffect')
                console.log(cellContent)
                const id = cellContent[0];
                const content = cellContent[1]
                updateContent(id, content)
            }
            return () => setCellContent(null)
        })() 
    }, [cellContent])

    const updateContent = (id, content) => {
        const update = [...displayContent]
        if (content === 'flag') {
            update[id] = flag
            setDisplayContent(update)
        } else if (content === 'unflag') {
            update[id] = ''
            setDisplayContent(update);
        } else {
            updateDiv(id)
            if (content === 'mine') {
                
                update[id] = bomb
                setDisplayContent(update);
            } else if (content === 'number') {
                
                update[id] = number(stateCells[id].minedNeighbourCount)
                setDisplayContent(update);
            } else if (content === 'blank') {
                
                update[id] = ''
                setDisplayContent(update);
            }
        }
    }

    const updateDiv = (id) => {
        if (id || id === 0) {
            const element = document.getElementById(id)
            element.classList.add('open');
        }
        
    }

    return (

        CELLS.map(cell => ( <div id={cell.id} key={cell.id} className='cell' style={cell.cellStyle} onMouseDown={(event) => handleClick(event)}>{cell.content}</div> ))
    )
}