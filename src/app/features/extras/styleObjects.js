export const styleGrid = (i) => {
    return {
        gridTemplateColumns: `repeat(${i}, 1fr)`,
        gridTemplateRows: `repeat(${i}, 1fr)`,
    }
}

export const styleCell = (row, column) => {    
    return {
        gridArea: `${row + 1} / ${column + 1} / ${row + 2} / ${column + 2}`,
    }
}

export const styleSpan = (minedNeighbourCount) => {
    let countColor = ['blue', 'green', 'red', 'dark-blue', 'maroon', 'teal', 'grey', 'black']
    // let displayNum = 'inherit';
    if (minedNeighbourCount === 0) {
        return {
            display: 'none',
        }
    } else {
        return {
            color: `${countColor[minedNeighbourCount - 1]}`,
        }
    }
}