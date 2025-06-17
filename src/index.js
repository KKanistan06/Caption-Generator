import React from 'react';
import ReactDOM from 'react-dom/client'; // Change here
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // Change here
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
