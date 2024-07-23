import { neighbourTopLeft, neighbourTopCentre, neighbourTopRight, neighbourLeft, neighbourRight, neighbourBottomLeft, neighbourBottomCentre, neighbourBottomRight } from './neighbourFunctions';
const _ = require('lodash'); 

export const createGridState = (gameState) => {
   let [rows, columns, mineCount] = [gameState.rows, gameState.columns, gameState.mines];
   const randomMines = getMines(mineCount, rows * columns);
   const result = [];
   let index = 0;
   for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
         let neighbours = getNeighbours(index, r, c, rows, columns)
         let isMined = randomMines.includes(index);
         result.push({
            id: r.toString().padStart(2,'0') + c.toString().padStart(2,'0'),
            mined: isMined,
            flagged: false,
            selected: false,
            neighbours,
            minedNeighbourCount: isMined ? null : neighbours.filter(n => randomMines.includes(n)).length,
            index
         })
         index += 1;
      }
   }
   return result
}

const getMines = (mineCount, total) => {
   const result = []
   do {
      let num = _.random(total - 1)
      if (!result.includes(num)) result.push(num)
   } while (result.length < mineCount)
   return result;
}

const getNeighbours = (index, rowIndex, columnIndex, rowCount, columnCount) => {
   const cellValues = { index, rowIndex, columnIndex, rowCount, columnCount }
   cellValues.rowMax = rowCount - 1
   cellValues.columnMax = columnCount - 1

   const results = []

   results.push(neighbourTopLeft(cellValues))
   results.push(neighbourTopCentre(cellValues))
   results.push(neighbourTopRight(cellValues))

   results.push(neighbourLeft(cellValues))
   results.push(neighbourRight(cellValues))
   
   results.push(neighbourBottomLeft(cellValues))
   results.push(neighbourBottomCentre(cellValues))
   results.push(neighbourBottomRight(cellValues))

   return results
}



export const batchSelectNeighbours = (arrayIn, arrayOut, allCells, coll) => {
   let collection = coll
   collection.push(arrayIn)
   collection = cleanArray(collection, [])
   arrayOut = _.difference(arrayOut, collection)
   if (arrayOut.length > 0) {
      let recurValues = compareFunc(arrayOut, allCells, collection)
      return batchSelectNeighbours(...recurValues)
   }
   return collection
}

// export const batchSelectNeighbours = (arrayIn, arrayOut, allCells, coll) => {
//    let collection = coll
//    collection.push(arrayIn)
//    collection = cleanArray(collection, [])
//    arrayOut = _.difference(arrayOut, collection)
//    if (arrayOut.length > 0) {
//       return compareFunc(arrayOut, allCells, collection)
//    } 
//    console.log('returning...')
//    console.log(collection)
//    return collection
// }

const compareFunc = (arr, allCells, coll) => {
   let arrayIn = []
   let arrayOut = []
   arr.forEach(el => {
      let cell = isNaN(el) ? null : allCells.find(c => el === c.index)
      if (cell && !cell.selected && !cell.flagged) {
         arrayIn.push(el)
         if (cell.minedNeighbourCount === 0) arrayOut.push(cell.neighbours)
      }
   });
   let cleanArrayOut = cleanArray(arrayOut, arrayIn)
   // batchSelectNeighbours(arrayIn, cleanArrayOut, allCells, coll)
   return [arrayIn, cleanArrayOut, allCells, coll]
}
   
const cleanArray = (arr1, arr2) => {
   let flat = arr1.flat()
   let sorted = flat.sort((a,b) => a - b)
   let unique = _.uniq(sorted)
   let notNull = _.pull(unique, null)
   let final = _.difference(notNull, arr2)
   return final
}