import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from './B-Grid';
import { setLevel, changeRows, changeColumns, resetGame, selectRows, selectColumns, selectLevel } from './A-GameSlice'
import { resetGrid } from './B-GridSlice';


const Game = () => {
   const [activeGame, setActiveGame] = useState(false)
   const dispatch = useDispatch()

   const updateGame = (category, value) => {
      if (category === 'level') dispatch(setLevel(value))
      else if (category === 'row') dispatch(changeRows(value))
      else if (category === 'column') dispatch(changeColumns(value))
   }

   const RESET = () => {
      dispatch(resetGrid())
      dispatch(resetGame())
      setActiveGame(false)
   }
   
   if (!activeGame) {
      return (
         <div className='container'>
            <CreateGame setActiveGame={setActiveGame} updateGame={updateGame} />
         </div>
      )
   } else {
      return (
         <div>
            <Grid RESET={RESET} />
         </div>
      )
   }
}
export const CreateGame = (props) => {
   const {setActiveGame, updateGame} = props;
   const levelRef = useRef(null)
   const rowRef = useRef(null)
   const columnRef = useRef(null)

   const gameRows = useSelector(selectRows)
   const gameColumns = useSelector(selectColumns)
   const gameLevel = useSelector(selectLevel)

   useEffect(() => {
      const divParents = [levelRef.current, rowRef.current, columnRef.current]
      for (let parent of divParents) {
         const buttons = parent.getElementsByClassName('button-init')
         for (let div of buttons) div.addEventListener('click', handleSelect)
      }
   }, [])

   useEffect(() => {
      const levelArray = levelRef.current.getElementsByClassName('button-init')
      for (let div of levelArray) {
         if (div.dataset.val === gameLevel) div.classList.add('selected')
         else div.classList.remove('selected')
      }
      
   }, [gameLevel])

   const handleSelect = (e) => {
      const category = e.target.dataset.category
      const value = parseInt(e.target.dataset.val)
      if (category === 'level') updateGame(category, value)         
      else updateGame(category, parseInt(value))
   }

   return (
      <div className='select-container'>
         <div ref={levelRef} className='button-row level-select'>
            <div className='title-row'>Select Game Level</div>
            <div className='button-init' data-category='level' data-val='easy'>Easy</div>
            <div className='button-init' data-category='level' data-val='medium'>Medium</div>
            <div className='button-init' data-category='level' data-val='hard'>Hard</div>
         </div>
         <div ref={rowRef} className='button-row'>
            <div className='title-row'>Select Grid Height</div>
            <div className='button-init' data-category='row' data-val='-5'>&#60;&#60;</div>
            <div className='button-init' data-category='row' data-val='-1'>&#60;</div>
            <div>{gameRows}</div>
            <div className='button-init' data-category='row' data-val='1'>&#62;</div>
            <div className='button-init' data-category='row' data-val='5'>&#62;&#62;</div>
         </div>
         <div ref={columnRef} className='button-row'>
            <div className='title-row'>Select Grid Width</div>
            <div className='button-init' data-category='column' data-val='-5'>&#60;&#60;</div>
            <div className='button-init' data-category='column' data-val='-1'>&#60;</div>
            <div>{gameColumns}</div>
            <div className='button-init' data-category='column' data-val='1'>&#62;</div>
            <div className='button-init' data-category='column' data-val='5'>&#62;&#62;</div>
         </div>
         <div className='button-row'>
         <div onClick={() => setActiveGame(true)} className='button-init'>Begin Game</div>
         </div>
      </div>
   )
}

export default Game