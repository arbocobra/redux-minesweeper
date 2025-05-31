export const styleGrid = (r,c) => {
   return {
       gridTemplateColumns: `repeat(${c}, 1fr)`,
       gridTemplateRows: `repeat(${r}, 1fr)`,
    //    maxWidth: `${c * 50}px`,
    //    maxHeight: `${r * 50}px`,
   }
}

export const styleCell = (row, column) => {    
   return {
       gridArea: `${row + 1} / ${column + 1} / ${row + 2} / ${column + 2}`,
   }
}

export const styleSpan = (num) => {
    let countColor = ['blue', 'green', 'red', 'darkBlue', 'maroon', 'teal', 'grey', 'black']
    return `color: ${countColor[num - 1]}`
}