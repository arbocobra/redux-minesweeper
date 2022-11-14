export const styleGrid = (i) => {
    return {
        display: 'grid',
        gridTemplateColumns: `repeat(${i - 1}, 1fr)`,
        gridTemplateRows: `repeat(${i - 1}, 1fr)`,
        gridGap: '1px',
        justifyItems: 'stretch',
        width: '100%',
        height: '100%'
    }
}



