import { createSlice } from '@reduxjs/toolkit';
import { createGridState } from '../../functions/helperFunctions.js';

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
      resetGrid: () => initialState
   }
})

export const selectStaticGridState = (state) => {
   const staticState = state.grid.map(cell => {
      return { id: cell.id, neighbours: cell.neighbours, minedNeighbourCount: cell.minedNeighbourCount, index: cell.index }
   })
   return staticState
}

export const selectGridState = (state) => state.grid

export const { loadGrid, openCell, flagCell, openMultiCells, resetGrid } = gridSlice.actions;

export default gridSlice.reducer;