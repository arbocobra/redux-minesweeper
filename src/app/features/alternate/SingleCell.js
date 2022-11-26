import React, {useState, useEffect} from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { styleCell } from './styleObjects';
import bombIcon from '../../../images/bomb-red.png';
import flagIcon from '../../../images/flag-green.png';
// import { openCell, flagCell, selectCells } from './gameSlice';

export const SingleCell = (props) => {
    const { cell, inputCell, cellContent } = props;
    const [displayContent, setDisplayContent] = useState('')

    const id = cell.id;
    const cellStyle = styleCell(cell.row, cell.column);

    const bomb = <img src={bombIcon} height='20' width='20' />;
    const flag = <img src={flagIcon} height='20' width='20' />;

    useEffect(() => {
        let element = document.getElementById(id)
        // element.addEventListener('mousedown',() => { handleClick ()}, event);
        element.addEventListener('mousedown', handleClick, {once: false});
        element.oncontextmenu = function(e) {
            e.preventDefault();
        }
    }, []);

    const handleClick = (event) => {  
        inputCell(id, event.which);
    }

    useEffect(() => { if (cellContent) updateContent() }, [cellContent]);

    const updateContent = () => {
        if (cellContent === 'flag') {
            if (!displayContent) setDisplayContent(flag);
            else setDisplayContent('')
            
        }
        else {
            document.getElementById(id).classList.add('open');
            if (cellContent === 'mine') {
                setDisplayContent(bomb);
            } else if (cellContent === 'number') {
                setDisplayContent(cell.minedNeighbourCount);
            } else if (cellContent === 'blank') {
                return
            }
        }
    }


    // const {cell, isOpen, revealNeighbours, showCount, isMine, isFlagged } = props;
    // const [openState, setOpenState] = useState(Array(size).fill(false));
    // const cells = useSelector(selectCells);
    // const [cellContent, setCellContent] = useState('');
    // const [unopenedNeighbours, setUnopenedNeighbours] = useState(cell.neighbours)
    // const dispatch = useDispatch();   
    
    // const handleClick = (event) => {
    //     event.target.classList.add('open');
    //     if (event.which === 3) {
    //         dispatch(flagCell(id))
    //         setCellContent(flag)
    //     } else if (event.which === 1) {
    //         setOpenState(prev => [...prev, id])
    //         // dispatch(openCell(id))
    //         // setOpenCells(prev => prev.map((el, i) => i === id ? !el : el));
    //         if (cell.mined) {
    //             setCellContent(bomb)
    //         } else {
    //             let result = open(id)
    //             // console.log(result)
    //             if (result) {
    //                 const unopenedNeighbours = cell.neighbours.filter(n => {
    //                     if (!openState.includes(n)) {
    //                         return n;
    //                     }})
    //                 console.log(id)
    //                 console.log(unopenedNeighbours)
    //             //     setCellContent(cell.minedNeighbourCount);
    //             } else {
    //                 setCellContent(cell.minedNeighbourCount);
    //             }
    //         }
    //     }
    // }

    return (
        <div id={id} className='cell' style={cellStyle}>{displayContent}</div>
    )
}