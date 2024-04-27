import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Greeting from './components/Greeting.jsx';
import Navbar, { Main } from './components/Misc.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <Main />
    <Greeting />
  </React.StrictMode>
);
