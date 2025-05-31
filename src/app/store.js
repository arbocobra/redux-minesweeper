import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './features/load-game/gameSlice'
import gridReducer from './features/play-game/gridSlice'

export const Store = configureStore({
  reducer: {
    game: gameReducer,
    grid: gridReducer,
  },
});
