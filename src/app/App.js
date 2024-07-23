import './style/App.css';
import Game from './features/begin-game/Game';

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
