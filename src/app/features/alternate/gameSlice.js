import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { selectActiveCell } from './activeCellSlice';
import {
    calcMines,
    makeMineArray,
    makeCellObjs,
    findNeighbours,
    countMinedNeighbours
} from './generateFunctions'

const initialState = {
    status: 'loading',
    size: null,
    mines: 0,
    cells: [],
    // openCells: [],
    // flaggedCells: [],
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
            state.status = 'play'
        },
        openCell: (state, action) => {
            const id = action.payload;
            state.cells[id].opened = true;
            // state.openCells.push(id);
        },
        toggleFlag: (state, action) => {
            const id = action.payload;
            state.cells[id].flagged = !state.cells[id].flagged
        },
        // flagCell: (state, action) => {
        //     const id = action.payload;
        //     state.cells[id].flagged = true;
        //     state.flaggedCells.push(id);
        // },
        changeGameStatus: (state, action) => {
            state.status = action.payload;
        }
        // filterNeighbours: (state, action) => {
        //     const id = action.payload;
        //     const neighbours = state.cells[id].neighbours;
        //     return neighbours.filter(item => !state.cells[item].opened)
        // }
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
    //   [createCells.pending]: (state, action) => {
    //     state.isLoading = true;
    //     state.hasError = false;
    //   },
    //   [createCells.fulfilled]: (state, action) => {
    //     state.isLoading = false;
    //     state.hasError = false;
    //     state.cells = action.payload;
    //   },
    //   [createCells.rejected]: (state, action) => {
    //     state.isLoading = false;
    //     state.hasError = true;
    //   },
    }
};

export const gameSlice = createSlice(sliceOptions);
export const { startGame, openCell, toggleFlag, changeGameStatus } = gameSlice.actions;
export const selectGame = (state) => state.game;
export const selectCells = (state) => state.game.cells;
// export const selectOpenCells = (state) => state.game.openCells;
// export const selectFlaggedCells = (state) => state.game.flaggedCells;
export default gameSlice.reducer;