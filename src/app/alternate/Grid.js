import React, {useState, useEffect, useRef, useReducer, useCallback, memo} from 'react';
import { styleGrid } from './styleObjects'
import { initialGridState, batchSelectNeighbours } from './helperFunctions';
import { Cell } from './Cell';

const _ = require('lodash'); 

const cellReducer = (cells, action) => {
   switch (action.method) {
      case 'selectSingle': {
         return cells.map((el,i) => {
            if (i === action.index) {
               return {
                  ...el,
                  selected: true
               }
            } else return el
         })
      }
      case 'flag': {
         return cells.map((el,i) => {
            if (i === action.index) {
               return {
                  ...el,
                  flagged: true
               }
            } else return el
         })
      }
      case 'unflag': {
         return cells.map((el,i) => {
            if (i === action.index) {
               return {
                  ...el,
                  flagged: false
               }
            } else return el
         })
      }
      case 'selectMultiple': {
         return cells.map(el => {
            if (action.neighbourArr.includes(el.index)) {
               return {
                  ...el,
                  selected: true,
               }
            } else return el
         })
      }
      case 'selectMine': {
         return cells.map((el,i) => {
            if (i === action.index) {
               return {
                  ...el,
                  selected: true,
               }
            } else return el
         })
      }
   } 
}

export const Grid = (props) => {
   const {gameState, setActiveGame} = props;
   const [cellState, dispatch] = useReducer(cellReducer, gameState, initialGridState)
   const gridState = useRef(null)
   const gridStyle = styleGrid(gameState.rows, gameState.columns);
   const [flagCount, setFlagCount] = useState([])

   useEffect(() => {
      document.getElementById('grid').addEventListener('contextmenu', (e) => {
         e.preventDefault();
       });
   },[])

   useEffect(() => { gridState.current = cellState }, [cellState])

   useEffect(() => {
      if (flagCount.length) {

      }
   }, [flagCount])

   const getBatchSelect = (current, neighbours, index) => {
      const result = batchSelectNeighbours(neighbours, [index], current)
      dispatch({
         method: 'selectMultiple',
         neighbourArr: result,
      })
   }

   const CELLS = cellState.map(el => el.id)

   // const handleClick = useCallback((e, cell) => {
   //    if (e <= 1) selectCell(cell.minedNeighbourCount, cell)
   //    else placeFlag(cell)
   // },[])

   const selectCell = (count, index) => {
      const cell = gridState.current[index]
      if (count > 0) {
         dispatch({
            method: 'selectSingle',
            index: cell.index,
         })
      } else if (count === 0) { 
         const current = gridState.current.map(el => ({count: el.minedNeighbourCount, neighbours: el.neighbours, selected: el.selected, flagged: el.flagged}))
         getBatchSelect(current, cell.neighbours, cell.index)
      } else if (count === null) { 
         dispatch({
            method: 'selectMine',
            index: cell.index,
         })
      } 
   }

   const placeFlag = (index) => {
      const cell = gridState.current[index]
      if (cell.flagged) { 
         dispatch({
            method: 'unflag',
            index: cell.index,
         })
         if (cell.mined) {
            setFlagCount((current) => {
               let i = current.lastIndexOf(true)
               return [...current.slice(0,i), ...current.slice(i + 1)]
            })
         } else {
            setFlagCount((current) => {
               let i = current.lastIndexOf(false)
               return [...current.slice(0,i), ...current.slice(i + 1)]
            })
         }
      } else { 
         dispatch({
            method: 'flag',
            index: cell.index,
         })
         if (cell.mined) setFlagCount((current) => [...current, true]) 
         else setFlagCount((current) => [...current, false])
         // document.getElementById(`cell-${index}`).removeEventListener('mousedown', handleClick)
      }
   }


   return (
      <div id='game' className='game-container'>
         <div>Mines: {flagCount.length}/{gameState.mines}</div>
         <div id='grid' className='grid-container' style={gridStyle}>
               {/* {CELLS.map((el,i) => <Cell key={`cell-${i}`} id={el} row={Number(el.slice(0,2))} column={Number(el.slice(2,4))} index={i} handleClick={handleClick} cellState={cellState[i]} />)} */}
               {CELLS.map((el,i) => <Cell key={`cell-${i}`} id={el} row={Number(el.slice(0,2))} column={Number(el.slice(2,4))} index={i} cellState={cellState[i]} selectCell={selectCell} placeFlag={placeFlag} />)}
         </div>
         <div onClick={() => setActiveGame(false)}>Cancel Game</div>
      </div>
   )
}