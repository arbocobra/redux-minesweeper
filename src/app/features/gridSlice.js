import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    size: null,
    mines: 0
}

const calcMines = (size, level) => {
    let square = Math.pow(size, 2);
    if (level === 'easy') {
        return Math.ceil(square * 0.12);
    } else if (level === 'hard') {
        return Math.ceil(square * 0.21);
    } else {
        return Math.ceil(square * 0.16);
    }
}

export const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        createGrid: (state, action) => {
            state.size = action.payload.size;
            state.mines = calcMines(state.size, action.payload.level);
        }
    }
})

export const { createGrid } = gridSlice.actions;

export const selectGrid = (state) => state.grid;

export default gridSlice.reducer;