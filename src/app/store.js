import { configureStore } from '@reduxjs/toolkit';
// import gridReducer from './features/gridSlice';
// import cellReducer from './features/cellSlice';
import gameReducer from './features/alternate/gameSlice';
// import activeCellReducer from './features/alternate/activeCellSlice';

export const store = configureStore({
  reducer: {
    // grid: gridReducer,
    // cells: cellReducer
    game: gameReducer,
    // activeCell: activeCellReducer
  },
});
