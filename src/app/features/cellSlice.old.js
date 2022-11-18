import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
  getCells,
  randomMines,
  getNeighbours,
  getMinedNeighbours,
} from '../components/helperFunctions';

// const setCells = async (size, i) => {
//     return {
//         id: i,
//         row: Math.floor(i / size),
//         column: i % size,
//         openned: false,
//         flagged: false,
//         isMined: false,
//         neighbours: [],
//         minedNeighbourCount: 0
//     }
// }

// export const loadCells = createAsyncThunk(
//     'cells/loadCells',
//     async (size) => {
//         const data = []
//         const total = Math.pow(size, 2);
//         for (let i = 0; i < total; i++) {
//             const cell = await setCells(size, i);
//             data.push(cell)
//         }
//         return data;
//     }
// )

// const sliceOptions = {
//     name: 'cells',
//     initialState: {
//         content: [],
//         isLoading: false,
//         hasError: false,
//         // actionComplete: false,
//     },
//     reducers: {
//         'addMines': (state, action) => {
//             const mineArray = randomMines(action.payload.size, action.payload.mines);
//             mineArray.forEach(mine => {
//                 // console.log(mine)
//                 state.content[mine].isMined = true;
//             })

//         },
//         'findNeighbours': (state, action) => {
//             state.content.forEach(cell => {
//                 cell.neighbours = getNeighbours(cell.id, cell.row, cell.column, action.payload)
//             })
//         },
//         'mineNeighbours': (state) => {
//             const shareState = current(state)
// state.content.forEach((cell) => {
//     cell.minedNeighbourCount = countMinedNeighbours(cell, shareState.content);
// })
//         }

//     },
//     extraReducers: {
//         [loadCells.pending]: (state, action) => {
//             state.isLoading = true;
//             state.hasError = false;
//         },
//         [loadCells.fulfilled]: (state, action) => {
//             state.isLoading = false;
//             state.hasError = false;
//             state.content = action.payload;
//         },
//         [loadCells.rejected]: (state, action) => {
//             state.isLoading = false;
//             state.hasError = true;
//         }
//     }

// }

// export const cellSlice = createSlice(sliceOptions);
// export const { addMines, findNeighbours, mineNeighbours } = cellSlice.actions;
// export const selectCells = (state) => state.cells.content;
// export default cellSlice.reducer;

// const getMinedNeighbours = async () => {}

export const createCells = createAsyncThunk(
  'cells/createCells',
  async (info) => {
    const {size, mines} = info;
    const data = [];
    //  getCells
    try {
      const total = Math.pow(size, 2);
      for (let i = 0; i < total; i++) {
        const cell = await getCells(size, i);
        data.push(cell);
      }
    } catch (e) {
      console.log('getCells ' + e);
    } finally {
      // getMines
      try {
        const mineArray = await randomMines(size, mines);
        // console.log(mineArray);
        for (let i = 0; i < mineArray.length; i++) {
            let m = mineArray[i]
            data[m].mined = true
        }
      } catch (e) {
        console.log('getMines ' + e);
      } finally {
        // getNeighbours
        try {
          for (let i = 0; i < data.length; i++) {
            const cell = data[i];
            const cellNeighbours = await getNeighbours(
              cell.id,
              cell.row,
              cell.column,
              size
            );
            data[i].neighbours = cellNeighbours;
          }
        } catch (e) {
          console.log('getNeighbours ' + e);
        } finally {
          // getMinedNeighbours
          try {
            for (let i = 0; i < data.length; i++) {
                const minedNeighbours = await getMinedNeighbours(data[i], data);
                data[i].minedNeighbourCount = minedNeighbours;
            //   if (data[i].mined) {
            //     const minedneighbours = await getMinedNeighbours(data[i], data);
            //     data[i].minedNeighbourCount = minedneighbours.length;
            //   } else {
            //     data[i].minedNeighbourCount = null;
            //   }
            }
          } catch (e) {
            console.log('getMinedNeighbours ' + e);
          } finally {
            return data;
          }
        }
      }
    }
  }
);

const sliceOptions = {
  name: 'cells',
  initialState: {
    content: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
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
export const selectCells = (state) => state.cells.content;
export default cellSlice.reducer;
