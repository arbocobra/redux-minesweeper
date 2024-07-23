import { createSlice } from '@reduxjs/toolkit';
import { createGridState } from './helperFunctions';

const initialState = []

export const gridSlice = createSlice({
   name: 'grid',
   initialState: initialState,
   reducers: {
      loadGrid: (state, action) => {
         const gameGrid = createGridState(action.payload)
         return gameGrid
      },
      openCell: (state, action) => {
         return state.map(cell => {
            if (cell.index === action.payload) return { ...cell, selected: true }
            else return cell
         })
      },
      flagCell: (state, action) => {
         return state.map(cell => {
            if (cell.index === action.payload) {
               if (cell.flagged) return { ...cell, flagged: false }
               else return { ...cell, flagged: true }
            }
            else return cell
         })
      },
      openMultiCells: (state, action) => {
         const openArray = action.payload
         const stateCopy = state.map(cell => {
            if (openArray.includes(cell.index)) return { ...cell, selected: true }
            else return cell
         })
         return stateCopy
      },
      resetGrid: (state) => initialState
   }
})

export const selectGridState = (state) => state.grid

export const { loadGrid, openCell, flagCell, openMultiCells, resetGrid } = gridSlice.actions;

export default gridSlice.reducer;





// const cellReducer = (cells, action) => {
//    switch (action.method) {
//       case 'selectSingle': {
//          return cells.map((el,i) => {
//             if (i === action.index) {
//                return {
//                   ...el,
//                   selected: true
//                }
//             } else return el
//          })
//       }
//       case 'flag': {
//          return cells.map((el,i) => {
//             if (i === action.index) {
//                return {
//                   ...el,
//                   flagged: true
//                }
//             } else return el
//          })
//       }
//       case 'unflag': {
//          return cells.map((el,i) => {
//             if (i === action.index) {
//                return {
//                   ...el,
//                   flagged: false
//                }
//             } else return el
//          })
//       }
//       case 'selectMultiple': {
//          return cells.map(el => {
//             if (action.neighbourArr.includes(el.index)) {
//                return {
//                   ...el,
//                   selected: true,
//                }
//             } else return el
//          })
//       }
//       case 'selectMine': {
//          return cells.map((el,i) => {
//             if (i === action.index) {
//                return {
//                   ...el,
//                   selected: true,
//                }
//             } else return el
//          })
//       }
//    } 
// }