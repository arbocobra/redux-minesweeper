const _ = require('lodash'); 

export const initialGridState = (gameState) => {
   let [rows, columns, mineCount] = [gameState.rows, gameState.columns, gameState.mines];
   const randomMines = getMines(mineCount, rows * columns);
   const result = []
   let index = 0
   for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
         let neighbours = getNeighbours(index, r, c, rows, columns)
         result.push({
            id: r.toString().padStart(2,'0') + c.toString().padStart(2,'0'),
            mined: randomMines.includes(index),
            flagged: false,
            selected: false,
            neighbours,
            minedNeighbourCount: randomMines.includes(index) ? null : neighbours.filter(n => randomMines.includes(n)).length,
            index
         })
         index += 1;
      }
   }

   return result
}

export const getMines = (mineCount, total) => {
   const result = []
   do {
      let num = _.random(total - 1)
      if (!result.includes(num)) result.push(num)
   } while (result.length < mineCount)
   return result;
}

const getNeighbours = (i, row, col, rows, cols) => {
   const [rowMax, colMax] = [rows - 1, cols - 1]
   const results = []
   // T-L
   if (row > 0 && col > 0) results.push((i - 1) - cols)
   else results.push(null)
   // T-M
   if (row > 0) results.push(i - cols)
   else results.push(null)
   // T-R
   if (row > 0 && col < colMax) results.push((i + 1) - cols)
   else results.push(null)
   // L
   if (col > 0) results.push(i - 1)
   else results.push(null)
   // R
   if (col < colMax) results.push(i + 1)
   else results.push(null)
   // B-L
   if (row < rowMax && col > 0) results.push((i - 1) + cols)
   else results.push(null)
   // B-M
   if (row < rowMax) results.push(i + cols)
   else results.push(null)
   // B-R
   if (row < rowMax && col < colMax) results.push((i + 1) + cols)
   else results.push(null)

   return results;
}

export const batchSelectNeighbours = (neighbours, initialValue, data) => {

   const cycle = neighbours.filter(el => _.isNumber(el) && !data[el].selected)
   const collection = [...initialValue, ...cycle].filter(el => _.isNumber(el) && !data[el].flagged).sort((a,b) => a - b)
   if (!cycle.length) return collection
   else {
      const recycle = cycle.filter(el => data[el].count === 0)
      if (recycle.length) {
         const extendCycle = _.uniq(_.pullAll(recycle.map(el => data[el].neighbours).flat(), collection))
         return batchSelectNeighbours(extendCycle, collection, data)
         // if (extendCycle.length) batchSelectNeighbours(extendCycle, collection, data)
         // else return collection
      } else return collection
      //    if (!extendCycle.length) {
      //       return collection
      //    } 
      // } else return collection
   
      // return collection
   }
}
// export const getAllUnminedNeighbours = (grid, arr, init) => {
//    const result = recycleArr([arr, init], grid)
//    const collection = _.uniq(result[1]).sort((a,b) => a - b)
//    if (result[0].length) {
//       let extendCycle = result[0].map(el => grid[el].neighbours).flat(1)
//       let filteredRecycle = _.uniq(_.pullAll(_.pull(extendCycle, null), collection))
//       if (filteredRecycle.length) getAllUnminedNeighbours(grid, filteredRecycle, collection)
//       else {
//          // giveItBack(collection)
//          return collection
//       }
//    } else {
      
//       return collection
//       // giveItBack(collection)
//    }
// }
// const recycleArr = (arr, grid) => {
//    const cycle = arr[0]
//    const collection = arr[1]
//    const recycle = []
//    cycle.map(el => {
//       if (el) {
//          if (!grid[el].selected) {
//             if (grid[el].minedNeighbourCount === 0) {
//                recycle.push(el)
//                collection.push(el)
//             }
//             else collection.push(el)
//          }
//       }
//    })
//    return [recycle, collection]
// }