import { useEffect, useRef, useReducer, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { styleCell, styleSpan } from '../../style/styleObjects.js'
import { openCell, flagCell, openMultiCells } from './gridSlice.js'
import flagIcon from '../../../images/flag-green.png'
import redBomb from '../../../images/bomb-red.png'
import whiteBomb from '../../../images/bomb-white.png'

const Cell = memo(function Cell(props) {
   const { cellState, multiSelect, selectMine, placeFlag, bomb } = props
   const dispatch = useDispatch()
   const cellRef = useRef(null)
   const firstRender = useRef(true)

   const { id, mined, flagged, selected, neighbours, minedNeighbourCount, index } = cellState
   const row = Number(id.slice(0,2))
   const column = Number(id.slice(2,4))

   const cellStyle = styleCell(row,column)

   useEffect(() => { 
      if (!firstRender.current) {
         if (selected) cellOpened()
         else if (flagged) cellFlagged(true)
         else if (!flagged && !selected) cellFlagged(false)
      }
   }, [cellState])

   useEffect(() => { 
      if (!firstRender.current) {
         cellRef.current.removeEventListener('mouseup', handleClick)
         let bombIcon
         if (selected) {
            bombIcon = whiteBomb
            cellRef.current.classList.add('bomb')
         } else bombIcon = redBomb
         cellRef.current.innerHTML = `<img src=${bombIcon} alt='bomb'/>`
      }
   }, [bomb])

   useEffect(() => { 
      cellRef.current.addEventListener('mouseup', handleClick) 
      firstRender.current = false
   }, [])

   const cellOpened = () => {
      if (mined) selectMine()
      else {
         cellRef.current.classList.add('open')
         const neighbourCount = displayNeighbours()
         cellRef.current.replaceChildren(neighbourCount)
      }
   }

   const cellFlagged = (bool) => {
      if (bool) cellRef.current.innerHTML = `<img src=${flagIcon} alt='green flag'/>`
      else cellRef.current.innerHTML = null 
      placeFlag(bool, mined) 
   }

   const displayNeighbours = () => {
      const span = document.createElement('span')
      if (minedNeighbourCount > 0) {
         const spanStyle = styleSpan(cellState.minedNeighbourCount);
         span.innerText = cellState.minedNeighbourCount;
         span.setAttribute('style', spanStyle)
      }
      return span
   }

   const handleClick = useCallback((e) => {
      if (e.button <= 1) {
         if (minedNeighbourCount === 0 && !mined) {
            const allNeighbours = multiSelect(cellState)
            if (!allNeighbours.includes(index)) allNeighbours.push(index)
            dispatch(openMultiCells(allNeighbours))
         } else dispatch(openCell(index))
      } else if (e.button === 2) {
         dispatch(flagCell(index))
      }
   }, [])

   return (<div id={`cell-${index}`} ref={cellRef} className='cell'></div>)
})

export default Cell