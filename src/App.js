import React from 'react';
import './App.css';
import Nav from './components/navbar'
import { HashRouter } from 'react-router-dom';
function App() {
  return (
    <HashRouter>
      <Nav />
    </HashRouter>
  );
}

export default App;
