import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx'
import Todo from './components/Todo';
import Bio from './components/Bio';
import Avatar from './components/Avatar';
import TodoList from './components/TodoList';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Todo />
    <Bio />
    <Avatar />
    <TodoList />
  </React.StrictMode>
);
