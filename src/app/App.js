// import React, { useState } from 'react';
import './App.css';
import { Game } from './components/Game'
// import { CreateGrid } from './components/CreateGrid';
// import { Grid } from './features/Grid';

const App = () => {
  return (
        <div className='app'>
          <div className='container'>
            <h1>Mineweeper - Redux</h1>
              <Game />
          </div>
        </div>
      )
  }
  // const [grid, setGrid] = useState(false);
  // const [gameState, setGameState] = useState('load')

  
//   if (gameState === 'load') {
//   return (
//     <div className='app'>
//       <div className='container'>
//         <h1>Mineweeper - Redux</h1>
//           <CreateGrid setGameState={setGameState} />
//       </div>
//     </div>
//   )
//   } else if (gameState === 'play') {
//     return (
//       <div className='app'>
//         <div className='container'>
//         {/* <div className='container-inner'> */}
//           <h1>Mineweeper - Redux</h1>
//               <Grid />
//         </div>
//       </div>
//     )
//   }
// };
export default App;
