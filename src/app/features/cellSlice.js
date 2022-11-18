import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
  makeMineArray,
  makeCellObjs,
  findNeighbours,
  countMinedNeighbours,
} from '../components/helperFunctions';

// export const cellSlice = createSlice({
//   name: 'cells',
//   initialState: {
//     content: null,
//   },
//   reducers: {
//     createCells: (state, action) => {
//       const info = action.payload;
//       makeMineArray(info)
//       .then(infoWithMineArr => makeCellObjs(infoWithMineArr))
//       .then(arrOfOrderAndCellData => findNeighbours(arrOfOrderAndCellData))
//       .then(arrofOrderAndDataWithN => countMinedNeighbours(arrofOrderAndDataWithN))
//       .then(response => {
//         console.log(response);
//         state = {...state, state.content: response}
//       })
//     }
//   }
// }
  
// )

// export const { createCells } = cellSlice.actions;
// export const selectCells = (state) => state.cells.content;
// export default cellSlice.reducer;

export const createCells = createAsyncThunk(
  'cells/createCells',
  async (info) => {
    
    // makeMineArray(info)
    //   .then(info => makeCellObjs(info))
    //   .then(infoData => findNeighbours(infoData))
    //   .then(infoData => countMinedNeighbours(infoData))
    //   .then(data => {
    //     console.log(data)
    //     return data;
    //   })
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