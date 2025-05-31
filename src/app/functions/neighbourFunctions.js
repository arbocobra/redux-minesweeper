
export const neighbourTopLeft = (cell) => {
   const { index, rowIndex, columnIndex, rowCount, columnCount, rowMax, columnMax } = cell
   if (rowIndex > 0 && columnIndex > 0) return (index - 1) - columnCount
   else return null
}

export const neighbourTopCentre = (cell) => {
   const { index, rowIndex, columnIndex, rowCount, columnCount, rowMax, columnMax } = cell
   if (rowIndex > 0) return index - columnCount
   else return null
}

export const neighbourTopRight = (cell) => {
   const { index, rowIndex, columnIndex, rowCount, columnCount, rowMax, columnMax } = cell
   if (rowIndex > 0 && columnIndex < columnMax) return (index + 1) - columnCount
   else return null
}

export const neighbourLeft = (cell) => {
   const { index, rowIndex, columnIndex, rowCount, columnCount, rowMax, columnMax } = cell
   if (columnIndex > 0) return (index - 1)
   else return null
}

export const neighbourRight = (cell) => {
   const { index, rowIndex, columnIndex, rowCount, columnCount, rowMax, columnMax } = cell
   if (columnIndex < columnMax) return (index + 1)
   else return null
}

export const neighbourBottomLeft = (cell) => {
   const { index, rowIndex, columnIndex, rowCount, columnCount, rowMax, columnMax } = cell
   if (rowIndex < rowMax && columnIndex > 0) return (index - 1) + columnCount
   else return null
}

export const neighbourBottomCentre = (cell) => {
   const { index, rowIndex, columnIndex, rowCount, columnCount, rowMax, columnMax } = cell
   if (rowIndex < rowMax) return index + columnCount
   else return null
}

export const neighbourBottomRight = (cell) => {
   const { index, rowIndex, columnIndex, rowCount, columnCount, rowMax, columnMax } = cell
   if (rowIndex < rowMax && columnIndex < columnMax) return (index + 1) + columnCount
   else return null
}
