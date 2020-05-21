import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Nav from './components/navbar'
function App() {
  return (
    <HashRouter>
      <Nav />
    </HashRouter>
  );
}

export default App;
