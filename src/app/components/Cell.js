import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFlag, openCell, selectCells } from '../features/cellSlice';
import { styleCell, styleSpan } from './componentStyles';
// import cellClick from './cellClick';
import bomb from '../../images/bomb-red.png';
import flagR from '../../images/flag-red.png';
import flagG from '../../images/flag-green.png';

export const Cell = (props) => {
    const dispatch = useDispatch();

    const cells = useSelector(selectCells);
    
    const {cell, mines, setGameState, testPropPass} = props;
    const {column, flagged, id, mined, minedNeighbourCount, neighbours, opened, row } = cell;
    const [cellContent, setCellContent] = useState('');
    const [flagCount, setFlagCount] = useState(0);
    const [correctFlags, setCorrectFlags] = useState(0)

    useEffect(() => {
        let element = document.getElementById(id)
        element.addEventListener('mousedown', handleClick);
        element.oncontextmenu = function(e) {
            e.preventDefault();
        }
    }, []);
    
    const redBomb = <img src={bomb} height='20' width='20' />
    const redFlag = <img src={flagR} height='20' width='20' />
    const greenFlag = <img src={flagG} height='20' width='20' />

    const cellStyle = styleCell(row, column);
    const spanStyle = styleSpan(minedNeighbourCount);

    const handleClick = (event) => {
        let div = event.target;
        if (event.which === 1) {
            clickCell('left', div)
        } else if (event.which === 3) {
            clickCell('right', div)
        }
    }

    const flag = () => {
        dispatch(toggleFlag(id))
    }
    const open = () => {
        dispatch(openCell(id))
    }

    // Click actions
    const clickCell = (click, div) => {
        console.log('click ' + id)
        // console.log(neighbours)
        // - left click - changes cell state.opened = true
        if (click === 'left') {
            open();
            div.classList.add('open');
            // -- is bomb
            if (mined) {
                // ---> game loss
                setCellContent(redBomb);
                alert('game lost')
            // -- is not bomb
            } else {
                // --- has bombed neighbours
                if (minedNeighbourCount > 0) {
                    // ----> display bombed neighbour count (with colour code)
                    setCellContent(<span style={spanStyle}>{minedNeighbourCount}</span>);
                // --- has no bombed neighbours 
                } else if (minedNeighbourCount === 0) {
                    // ----> opens neighbour cells - opens all surrounding cells with no bombed neightbours, including neighbours displaying bombed neighbours
                    for (let i = 0; i < neighbours.length; i++) {
                        let nId = neighbours[i];
                        open();
                        let nDiv = document.getElementById(`${nId}`)
                        nDiv.classList.add('open');
                        // incomplete 
                    }
                }
            }
        // - right click  - changes cell state.flagged = true
        } else if (click === 'right') {
            // -- is not final flag
            // ---> decrement flag count && deactivate click listener
            flag();
            setCellContent(greenFlag);
            setFlagCount(flagCount++)
            if (mined) {
                setCorrectFlags(correctFlags++);
            }
            // -- is final flag
            if (flagCount === mines) {
                // --- all flags correct
                if (correctFlags === mines) {
                    // ----> game won
                    alert('game won')
                    setGameState('win')
                // --- all flags not correct
                } else {
                    // ----> can no longer add flags || flag count dislpays negative
                    alert('wrong flags')
                }
            }
            // -- is already flagged
            if (flagged) {
                setCellContent('');
                setFlagCount(flagCount--);
                if (mined) {
                    setCorrectFlags(correctFlags--)
                }
                // ---> removes flag && increments flag count && re-adds event listener on cell
            }


        }    
    }


    // const id = `cell${cell.id}`
    
    return (
        <div id={id} className='cell' style={cellStyle}>{cellContent}</div>
    )
}