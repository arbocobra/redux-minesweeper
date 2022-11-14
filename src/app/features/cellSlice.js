import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    // id: null, //state.length + 1
    // row: '', //  math.floor(id/'x') 
    // column: '', //id % x
    // openned: false,
    // flagged: false,
    // mined: false,
    // neighbours: [],
    // minedNeighbourCount: 0,
}

export const cellSlice = createSlice({
    name: 'cells',
    initialState,
    reducers: {
        setCells: (state, action) => {
            const x = action.payload(action.payload.size)
            const totalCells = Math.pow(x, 2);
            for (let i = 0; 1 < totalCells; i++) {
                const cell = {};
                cell.id = i;
                cell.row = Math.floor(i / x);
                cell.column = i % x;
                cell.openned = false;
                cell.flagged = false;
                cell.mined = false;
                cell.neighbours = [];
                cell.minedNeighbourCount = 0;
                state = {...state.cells, cell}
            }
            return;
        }
        // setMines: (state, action) => {

        // }
    }
})

export const { setCells } = cellSlice.actions;

export const selectCells = (state) => state.cells;

export default cellSlice.reducer;