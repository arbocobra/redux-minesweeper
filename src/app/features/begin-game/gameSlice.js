import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   level: 'medium', 
   rows: 10, 
   columns: 10, 
   mines: 16, 
   multiplier: 0.156, 
}

export const gameSlice = createSlice({
   name: 'game',
   initialState: initialState,
   reducers: {
      setLevel: (state, action) => {
         const val = action.payload;
         state.level = val;
         state.multiplier = val === 'easy' ? 0.123 : val === 'hard' ? 0.208 : 0.156;
         state.mines = Math.round((state.columns * state.rows) * state.multiplier)
      },
      changeRows: (state, action) => {
         const val = action.payload;
         state.rows = (state.rows + val) < 100 ? state.rows + val : 99;
         state.mines = Math.round((state.columns * state.rows) * state.multiplier)
      },
      changeColumns: (state, action) => {
         const val = action.payload;
         state.columns = (state.columns + val) < 100 ? state.columns + val : 99;
         state.mines = Math.round((state.columns * state.rows) * state.multiplier)
      },
      resetGame: (state) => initialState
   }
})


export const selectRows = (state) => state.game.rows
export const selectColumns = (state) => state.game.columns
export const selectLevel = (state) => state.game.level
export const selectGameState = (state) => state.game

export const { setLevel, changeRows, changeColumns, resetGame } = gameSlice.actions;

export default gameSlice.reducer;