import React, { useState } from 'react';
import './App.css';
import { CreateGrid } from './components/CreateGrid';
import { Grid } from './features/Grid';

export const App = () => {
  const [grid, setGrid] = useState(false);
  
  if (!grid) {
  return (
    <div className='app'>
      <div className='container'>
        <h1>Mineweeper - Redux</h1>
          <CreateGrid setGrid={setGrid} />
      </div>
    </div>
  )
  } else {
    return (
      <div className='app'>
        <div className='container'>
          <h1>Mineweeper - Redux</h1>
            <Grid />
        </div>
      </div>
    )
  }
};
export default App;
