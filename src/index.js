import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import './styles/index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import '@mui/material/styles'; // Esto agrega el estilo de Material UI

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Esto registrará el service worker
serviceWorkerRegistration.register();