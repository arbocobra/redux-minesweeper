import React, { useState, useEffect } from 'react';
import {TestComp} from './TestComp';

export const DisplayFlags = (props) => {
    const { mines, count } = props;
    // const [id, setId] = useState(0)
    // const testArray = [1,2,3,4,5,6,7,8,9,10]
    // // const id = [...testArray];
    

    // useEffect(() => {
    //     console.log(id)
    // }, [id])
    
    // const handleClick = () => setId(current => current + 1)




    return (
        <div>{ count ? mines - count : mines }</div>
        // <div>
        // <div>{ count ? mines - count : mines }</div>
        // { testArray.map(t => <TestComp key={t} num={t} id={id} />)}
        // <button onClick={() => handleClick()}>Push</button>
        // </div>
    )
}