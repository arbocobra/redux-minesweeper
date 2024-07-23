import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './features/begin-game/gameSlice'
import gridReducer from './features/play-game/gridSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
    grid: gridReducer,
  },
});
