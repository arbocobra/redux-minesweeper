import './style/App.css';
import redBomb from '../images/bomb-red.svg'
import Game from './features/load-game/Game';

const App = () => {
  return (
        <div className='app'>
          <div className='header'>
            Redux Minesweeper
            <img src={redBomb}/>
          </div>
          <div className="app-inner">
            <Game />
          </div>
        </div>
      )
  }

export default App;