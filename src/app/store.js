import { configureStore } from '@reduxjs/toolkit';
import gridReducer from './features/gridSlice';
import cellReducer from './features/cellSlice';

export const store = configureStore({
  reducer: {
    grid: gridReducer,
    cells: cellReducer
  },
});
