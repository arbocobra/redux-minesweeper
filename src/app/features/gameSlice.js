import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    calcMines,
    makeMineArray,
    makeCellObjs,
    findNeighbours,
    countMinedNeighbours,
} from './extras/generateFunctions'

const initialState = {
    status: 'loading',
    size: null,
    mines: 0,
    square: null,
    cells: [],
    isLoading: false,
    hasError: false,
}

export const createCells = createAsyncThunk(
    'game/createCells',
    async (info) => {
        const mineRespone = await makeMineArray(info);
        const cellResponse = await makeCellObjs(mineRespone);
        const neighbourResponse = await findNeighbours(cellResponse);
        const countResponse = await countMinedNeighbours(neighbourResponse);
        return countResponse
    }
  );

const sliceOptions = {
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action) => {
            state.size = action.payload.size;
            state.mines = calcMines(state.size, action.payload.level);
            state.status = 'play';
            state.square = Math.pow(action.payload.size, 2);
        },
        changeGameStatus: (state, action) => {
            state.status = action.payload;
        },
        resetGame: (state) => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createCells.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        });
        builder.addCase(createCells.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.cells = action.payload;
        });
        builder.addCase(createCells.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        });
    }
};

export const gameSlice = createSlice(sliceOptions);
export const { startGame, changeGameStatus, resetGame } = gameSlice.actions;
export const selectGame = (state) => state.game;
export const selectCells = (state) => state.game.cells;
export default gameSlice.reducer;