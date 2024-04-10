import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from "./redux/store.js"
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { SocketContextProvider } from './context/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SocketContextProvider>
      <Router>
        <App />
      </Router>
    </SocketContextProvider>
  </Provider>
)
