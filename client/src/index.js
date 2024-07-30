import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import { Provider as ReduxProvider } from 'react-redux'
import './App.css';
import App from './App';

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
)
