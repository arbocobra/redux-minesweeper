import { configureStore } from '@reduxjs/toolkit';
// import gameReducer from './features/gameSlice';
import gameReducer from './remake/A-GameSlice'
import gridReducer from './remake/B-GridSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    grid: gridReducer,
  },
});
