import React, {useEffect} from 'react';

export const FlagCount = (props) => {
    const { mines, flaggedCells } = props;
    console.log(flaggedCells)

    const displayFlags = () => {
        return mines - flaggedCells.length;
    }

    const flags = displayFlags()

    // useEffect(() => updateDisplay(), [flaggedCells]);

    return (
        <div>{flags}</div>
    )

}