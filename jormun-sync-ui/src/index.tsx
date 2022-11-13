import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import './css/zephyr.min.css';
import './css/fontawesome/css/all.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
