import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
  makeMineArray,
  makeCellObjs,
  findNeighbours,
  countMinedNeighbours,
} from '../components/helperFunctions';


export const createCells = createAsyncThunk(
  'cells/createCells',
  async (info) => {
      const mineRespone = await makeMineArray(info);
      const cellResponse = await makeCellObjs(mineRespone);
      const neighbourResponse = await findNeighbours(cellResponse);
      const countResponse = await countMinedNeighbours(neighbourResponse);
      return countResponse
  }
);

const sliceOptions = {
  name: 'cells',
  initialState: {
    content: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
    toggleFlag: (state, action) => {
      let id = action.payload;
      let isFlagged = state.content[id].flagged;
      state.content[id].flagged = !isFlagged;
    },
    openCell: (state, action) => {
      let id = action.payload;
      state.content[id].opened = true;
    }
  },
  extraReducers: {
    [createCells.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createCells.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.content = action.payload;
    },
    [createCells.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
};

export const cellSlice = createSlice(sliceOptions);
export const { toggleFlag, openCell } = cellSlice.actions;
export const selectCells = (state) => state.cells.content;
// export const selectCellById = (id) => 
export default cellSlice.reducer;