import React, {memo, useState, useEffect, useRef} from 'react';
import flag from '../../../images/flag-green.png'

// const Cell = memo(function Cell(props) {
const FlagCount = memo(function FlagCount(props) {
   const { flags, mines } = props

   const flagIcon = <img src={flag}/>

   return (
      <div className='flag-count'>{flagIcon}{flags} / {mines}</div>
   )
})

export default FlagCount