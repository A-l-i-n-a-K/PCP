

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStateProvider } from './GlobalStateContext';

ReactDOM.render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
  document.getElementById('root')
);
