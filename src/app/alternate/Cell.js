import React, {useState, useEffect, useRef, useReducer, useCallback, memo} from 'react';
import { styleCell,styleSpan } from './styleObjects'
import flagIcon from '../../images/flag-green.png';
import bombIcon from '../../images/bomb-red.png'

const _ = require('lodash'); 

export const Cell = memo(function Cell(props) {
   // const {id, row, column, index, handleClick, cellState} = props
   const {id, row, column, index, cellState, selectCell, placeFlag} = props
   const cellRef = useRef(null)

   let [isSelected, isFlagged, isMined] = [cellState.selected, cellState.flagged, cellState.mined];

   const cellStyle = styleCell(row,column)

   const count = () => {
      const span = document.createElement('span')
      if (cellState.minedNeighbourCount > 0) {
         const spanStyle = styleSpan(cellState.minedNeighbourCount);
         span.innerText = cellState.minedNeighbourCount;
         span.setAttribute('style', spanStyle)
      }
      return span
  }

//   useEffect(() => {cellRef.current.addEventListener('mousedown', (event) => handleClick(event.button, cellState))}, [])
   useEffect(() => { cellRef.current.addEventListener('mousedown', handleClick) }, [])

   useEffect(() => {
      if (isSelected) {
         cellRef.current.classList.add('open')
         const cellCount = count()
         cellRef.current.replaceChildren(cellCount)
      } else if (isMined) cellRef.current.innerHTML = `<img src=${bombIcon} alt='red bomb'/>`
      else if (isFlagged) cellRef.current.innerHTML = `<img src=${flagIcon} alt='green flag'/>`
      else {
         cellRef.current.innerHTML = null
      }
   }, [cellState])

   const handleClick = (event) => {
      if (event.button <= 1) selectCell(cellState.minedNeighbourCount, index)
      else placeFlag(index)
   }

   const limitClick = (event) => {

   }

   return (<div id={`cell-${index}`} ref={cellRef} className='cell' style={cellStyle} ></div>)
})