import React, {useState, useEffect} from 'react';

import { styleCell } from './extras/styleObjects';
import bombIcon from '../../images/bomb-red.png';
import flagIcon from '../../images/flag-green.png';

export const SingleCell = (props) => {
    const { cell, inputCell, cellContent } = props;
    const [displayContent, setDisplayContent] = useState('');

    const id = cell.id;
    const cellStyle = styleCell(cell.row, cell.column);

    const bomb = <img src={bombIcon} height='20' width='20' />;
    const flag = <img src={flagIcon} height='20' width='20' />;

    useEffect(() => {
        let element = document.getElementById(id)
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
            setDisplayContent(flag);
            
        } else if (cellContent === 'unflag') {
            setDisplayContent('');
        } else {
            document.getElementById(id).classList.add('open');
            if (cellContent === 'mine') {
                setDisplayContent(bomb);
            } else if (cellContent === 'number') {
                setDisplayContent(cell.minedNeighbourCount);
            } else if (cellContent === 'blank') {
                // document.getElementById(id).classList.remove('open');
                setDisplayContent('');
            }
        }
    }

    return (
        <div id={id} className='cell' style={cellStyle}>{displayContent}</div>
    )
}