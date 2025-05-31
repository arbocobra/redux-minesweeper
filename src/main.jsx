import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Store } from './app/store';
import App from './app/App';
import './index.css';

createRoot(document.getElementById('root')).render(
   <Provider store={Store}>
      <App />
   </Provider>
);
