export const styleGrid = (i) => {
    return {
        gridTemplateColumns: `repeat(${i}, 1fr)`,
        gridTemplateRows: `repeat(${i}, 1fr)`,
    }
}

export const styleCell = (row, column, minedNeighbourCount) => {    
    return {
        gridArea: `${row + 1} / ${column + 1} / ${row + 2} / ${column + 2}`,
    }
}