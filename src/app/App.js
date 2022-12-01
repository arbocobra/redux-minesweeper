// import React, { useState } from 'react';
import './App.css';
import { Game } from './components/Game';
// import { CreateGrid } from './components/CreateGrid';
// import { Grid } from './features/Grid';

const App = () => {
  return (
        <div className='app'>
          <div className="app-inner">
            <Game />
          </div>
        </div>
      )
  }

export default App;
